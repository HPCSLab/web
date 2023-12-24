import * as jsdom from "jsdom";
import * as fs from "fs";
import YAML from "yaml";
import { subtle } from "crypto";

const endpoint = "https://www.hpcs.cs.tsukuba.ac.jp";

function notNull<T>(item: T | null | undefined): item is T {
  return item !== null && item !== undefined;
}

type PublicationClass =
  | {
      class: "journal";
    }
  | {
      class: "international";
      subclass: "conference" | "poster";
    }
  | {
      class: "domestic";
      subclass: "conference" | "poster" | "workshop" | "magazine" | "misc";
    };

type Publication = {
  title: string;
  booktitle?: string;
  year: number;
  bibtex: string;
  authors: string[];
  doi?: string;
  slug: string;
  reference: string;
  class: PublicationClass;
};

function anyIndexOf(s: string, patterns: string[], startPos?: number): number {
  const pos = patterns
    .map((pattern) => s.indexOf(pattern, startPos))
    .reduce(
      (minimum, current) =>
        current === -1 ? minimum : current < minimum ? current : minimum,
      s.length,
    );
  if (pos == s.length) {
    return -1;
  } else {
    return pos;
  }
}

type Parsed = {
  authors?: string[];
  title?: string;
  booktitle?: string;
  year?: number;
  pp?: string;
  vol?: string;
  no?: string;
};

type ParsedFlake =
  | {
      type: "year";
      content: number;
    }
  | {
      type: "pp";
      content: string;
    }
  | {
      type: "vol";
      content: string;
    }
  | {
      type: "no";
      content: string;
    }
  | {
      type: "unknown";
      content: string;
    };

function parseFlake(flake: string): ParsedFlake {
  const pp = /^pp\.[ ]?(.+)$/.exec(flake);
  const vol = /^[vV]ol\.[ ]?(.+)$/.exec(flake);
  const year = /^\(?(\d{4})\)?\.?$/.exec(flake);
  const no = /^[nN]o\.[ ]?(.+)$/.exec(flake);
  if (pp && pp[1]) {
    return {
      type: "pp",
      content: pp[1],
    };
  } else if (vol && vol[1]) {
    return {
      type: "vol",
      content: vol[1],
    };
  } else if (year && year[1]) {
    return {
      type: "year",
      content: parseInt(year[1], 10),
    };
  } else if (no && no[1]) {
    return {
      type: "no",
      content: no[1],
    };
  } else {
    return {
      type: "unknown",
      content: flake,
    };
  }
}

function parseReference(ref: string): Parsed {
  const normalized = ref
    .replaceAll("．", ".")
    .replaceAll("，", ",")
    .replaceAll("”", '"')
    .replaceAll("“", '"')
    .replaceAll("：", ":");
  const endOfAuthorsPos = anyIndexOf(normalized, [":", '"', "「"]);
  const authors = normalized
    .slice(0, endOfAuthorsPos)
    .split(",")
    .map((author) => author.trim())
    .filter((s) => s.length > 0);
  const titleAndRest = normalized.slice(endOfAuthorsPos + 1);
  const titleEndPos = anyIndexOf(titleAndRest, [".", ",", "」"]);
  const title = titleAndRest.slice(0, titleEndPos);
  const trimedTitle = title.endsWith('"')
    ? title.slice(0, title.length - 1).trim()
    : title.trim();
  const parsed: Parsed = {
    authors,
    title: trimedTitle,
  };
  const rawInformations = titleAndRest.slice(titleEndPos + 1).trim();
  let informations = (
    rawInformations.startsWith(",") ||
    rawInformations.startsWith(".") ||
    rawInformations.startsWith('"')
      ? rawInformations.slice(1, rawInformations.length)
      : rawInformations
  ).trim();
  const yearMatched = /^(\d{4})年/.exec(informations);

  if (yearMatched && yearMatched[1]) {
    parsed.year = parseInt(yearMatched[1], 10);
    informations = informations
      .slice(yearMatched[0].length, informations.length)
      .trim();
  }
  const splited = informations.split(",").map((s) => parseFlake(s.trim()));
  let i = 0;
  for (; i < splited.length && splited[i].type == "unknown"; ++i) {
    const flake = splited[i];
    if (flake.type === "unknown") {
      if (parsed.booktitle) {
        parsed.booktitle = `${parsed.booktitle}, ${flake.content}`;
      } else {
        parsed.booktitle = flake.content;
      }
    }
  }
  for (; i < splited.length; ++i) {
    const flake = splited[i];
    switch (flake.type) {
      case "pp":
        parsed.pp = flake.content;
        break;
      case "vol":
        parsed.vol = flake.content;
        break;
      case "year":
        if (parsed.year === undefined) {
          parsed.year = flake.content;
        }
        break;
      case "no":
        parsed.no = flake.content;
        break;
    }
  }
  if (parsed.booktitle === undefined) {
    if (parsed.title) {
      const startBooktitlePos = anyIndexOf(parsed.title, [
        "情報処理学会論文誌",
        "電子情報通信学会技術研究報告",
      ]);
      if (startBooktitlePos != -1) {
        parsed.title = parsed.title.slice(0, startBooktitlePos).trim();
        parsed.booktitle = parsed.title
          .slice(startBooktitlePos + 1, parsed.title.length)
          .trim();
      }
    }
  }
  return parsed;
}

function extractYear(path: string): null | { year: number; path: string } {
  const year = /\d{4}/.exec(path);
  if (year && year[0]) {
    return { year: parseInt(year[0], 10), path };
  }
  return null;
}

// 2011-2 (2010年のこと)に対応
function adhocYearPatch(year: { year: number; path: string }): {
  year: number;
  path: string;
} {
  if (/-\d{4}-2\/$/.test(year.path)) {
    return {
      ...year,
      year: year.year - 1,
    };
  } else {
    return year;
  }
}

type RawPublication = {
  year: number;
  reference: string;
  title?: string;
  booktitle?: string;
  authors?: string[];
  bibtex?: string;
  doi?: string;
  slug: string;
};

function undefinedify<T>(value: T | null | undefined): T | undefined {
  if (value) {
    return value;
  } else {
    return undefined;
  }
}

async function parseTable(
  dom: Element,
  year: number,
): Promise<RawPublication[]> {
  return await Promise.all(
    [...dom.querySelectorAll(".bibitem")].map(async (item) => {
      const author = undefinedify(
        item.querySelector(".bibauthor")?.textContent,
      );
      const title = undefinedify(item.querySelector(".bibtitle")?.textContent);
      const booktitle = undefinedify(
        item.querySelector(".bibbooktitle")?.textContent,
      );
      const anchors = [...item.querySelectorAll("a")];
      const biblink = anchors.find(
        (anchor) => anchor.textContent === "[bibtex]",
      );
      const doi = anchors.find((anchor) => anchor.textContent === "[doi]")
        ?.href;
      if (biblink === undefined) {
        throw new Error(`bibtex link not found for ${year}: ${title}`);
      }
      const slug = /wp-publications\/(.+)\//.exec(biblink.href)?.[1];
      if (slug === undefined) {
        throw new Error(`cannot get slug for ${year}: ${title}`);
      }
      const bibFile = await (await fetch(`${endpoint}${biblink.href}`)).text();
      const bib = new jsdom.JSDOM(bibFile).window.document;
      const reference = undefinedify(
        bib.querySelector(".bibentry-reference")?.textContent,
      );
      const bibtex = undefinedify(
        bib.querySelector(".purebibtex")?.textContent,
      );
      if (reference === undefined) {
        throw new Error(`reference not found for ${year}: ${title}`);
      }
      return {
        title,
        year,
        reference,
        booktitle,
        authors: author
          ?.split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        doi,
        bibtex,
        slug,
      };
    }),
  );
}

async function parseUnorderedList(
  dom: Element,
  year: number,
): Promise<RawPublication[]> {
  const encoder = new TextEncoder();
  return Promise.all(
    [...dom.querySelectorAll("li")]
      .map((li) => li.textContent)
      .filter(notNull)
      .map(async (reference) => {
        const sha2 = await subtle.digest("SHA-256", encoder.encode(reference));
        const view = new DataView(sha2);
        return {
          reference,
          year,
          slug: `hpcs${year}-${view.getUint16(0, true)}`,
        };
      }),
  );
}

type RawContext = {
  h1: string | null;
  h2: string | null;
  h3: string | null;
};

function inferBibType(ctx: RawContext): "inproceedings" | "article" {
  if (ctx.h1 === "論文誌") {
    return "article";
  } else {
    return "inproceedings";
  }
}

function generateBibtex(
  ctx: RawContext,
  parsed: Parsed,
  year: number,
  slug: string,
): string {
  const start = `@${inferBibType(ctx)}{${slug},\n`;
  const title = parsed.title ? `  title = {${parsed.title}},\n` : "";
  const booktitle = parsed.booktitle
    ? `  booktitle = {${parsed.booktitle}},\n`
    : "";
  const pages = parsed.pp ? `  pages = {${parsed.pp}},\n` : "";
  const volume = parsed.vol ? `  vol = {${parsed.vol}},\n` : "";
  const number = parsed.no ? `  number = {${parsed.no}},\n` : "";
  const yearItem = `  year = {${year}},\n`;
  const close = "}";
  return start + title + booktitle + pages + volume + number + yearItem + close;
}

function supplyInformations(
  ctx: RawContext,
  pub: RawPublication,
  year: number,
): Publication {
  const parsed = parseReference(pub.reference);
  const title = pub.title ? pub.title : parsed.title;
  if (title === undefined) {
    console.log(parsed);
    throw new Error(`undefined title for ${pub.reference}`);
  }
  const booktitle = pub.booktitle ? pub.booktitle : parsed.booktitle;
  if (booktitle === undefined) {
    console.log(parsed);
  }
  const authors = pub.authors ? pub.authors : parsed.authors;
  if (authors === undefined) {
    console.log(parsed);
    throw new Error(`undefined authors for ${pub.reference}`);
  }
  const bibtex = pub.bibtex
    ? pub.bibtex
    : generateBibtex(ctx, parsed, year, pub.slug);
  return {
    title,
    booktitle,
    year: pub.year,
    authors,
    bibtex,
    slug: pub.slug,
    reference: pub.reference,
    class: classifyPublication(ctx),
  };
}

async function scrapeCollection(
  url: string,
  year: number,
): Promise<Publication[]> {
  const indexFile = await (await fetch(url)).text();
  const index = new jsdom.JSDOM(indexFile).window.document;
  const entries = index.querySelectorAll(".entry-content > *");
  const rawPublications: { pub: RawPublication; ctx: RawContext }[] = [];

  const rawContext: RawContext = {
    h1: null,
    h2: null,
    h3: null,
  };

  for (const entry of entries) {
    switch (entry.nodeName) {
      case "H1":
        rawContext.h1 = entry.textContent;
        rawContext.h2 = null;
        rawContext.h3 = null;
        break;
      case "H2":
        rawContext.h2 = entry.textContent;
        rawContext.h3 = null;
        break;
      case "H3":
        rawContext.h3 = entry.textContent;
        break;
      case "TABLE":
        for (const publication of await parseTable(entry, year)) {
          rawPublications.push({
            ctx: { ...rawContext },
            pub: publication,
          });
        }
        break;
      case "UL":
        for (const publication of await parseUnorderedList(entry, year)) {
          rawPublications.push({
            ctx: { ...rawContext },
            pub: publication,
          });
        }
        break;
      default:
        break;
    }
  }
  return rawPublications.map((pub) =>
    supplyInformations(pub.ctx, pub.pub, year),
  );
}

function classifyPublication(ctx: RawContext): PublicationClass {
  switch (ctx.h1) {
    case "論文誌":
      return {
        class: "journal",
      };
    case "国際発表":
      switch (ctx.h2) {
        case "国際会議":
          return {
            class: "international",
            subclass: "conference",
          };
        case "ポスター発表":
          return {
            class: "international",
            subclass: "poster",
          };
        default:
          throw new Error(`cannot classify ${JSON.stringify(ctx)}`);
      }
      break;
    case "国内発表":
      switch (ctx.h2) {
        case "シンポジウム":
          return {
            class: "domestic",
            subclass: "conference",
          };
        case "ポスター発表":
          return {
            class: "domestic",
            subclass: "poster",
          };
        case "研究会・その他":
          switch (ctx.h3) {
            case "研究会":
              return {
                class: "domestic",
                subclass: "workshop",
              };
              break;
            case "雑誌":
              return {
                class: "domestic",
                subclass: "magazine",
              };
            case "その他":
              return {
                class: "domestic",
                subclass: "misc",
              };
            case null:
              return {
                class: "domestic",
                subclass: "misc",
              };
            default:
              throw new Error(`cannot classify ${JSON.stringify(ctx)}`);
          }
        default:
          throw new Error(`cannot classify ${JSON.stringify(ctx)}`);
      }
    case null:
      return {
        class: "domestic",
        subclass: "misc",
      };
    default:
      throw new Error(`cannot classify ${JSON.stringify(ctx)}`);
  }
}

async function scrapePublications(): Promise<
  { year: number; collection: Publication[] }[]
> {
  const indexFile = await (await fetch(`${endpoint}/publications`)).text();
  const index = new jsdom.JSDOM(indexFile).window.document;
  const years = [...index.querySelectorAll(".page_item > a")]
    .map((anchor) => anchor.attributes.getNamedItem("href")?.value)
    .filter(notNull)
    .map(extractYear)
    .filter(notNull)
    .map(adhocYearPatch);
  const publications = await Promise.all(
    years.map(async (year) => ({
      year: year.year,
      collection: await scrapeCollection(`${endpoint}${year.path}`, year.year),
    })),
  );
  return publications;
}

for (const collection of await scrapePublications()) {
  fs.mkdirSync(`../publications/${collection.year}/`, {
    recursive: true,
  });
  for (const publication of collection.collection) {
    fs.writeFileSync(
      `../publications/${collection.year}/${publication.slug}.yml`,
      YAML.stringify(publication),
    );
  }
}
