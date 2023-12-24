import * as jsdom from "jsdom";
import YAML from "yaml";
import * as fs from "fs";

function notNull<T>(item: T | null | undefined): item is T {
  return item !== null && item !== undefined;
}

async function scrape() {
  const indexFile = await (
    await fetch("https://www.hpcs.cs.tsukuba.ac.jp/members/alumni/")
  ).text();
  const index = new jsdom.JSDOM(indexFile).window.document;

  const items = index.querySelectorAll(".entry-content > *");
  let ctx: string | null = null;
  const alumni: Map<
    string,
    { name: string; year: number; month: number }[] | string[]
  > = new Map();

  alumni.set(
    "fuculty",
    [...index.querySelectorAll(".entry-content > ul > li")]
      .map((li) => li.textContent)
      .filter(notNull)
  );
  for (const item of items) {
    if (item.nodeName === "H1") {
      ctx = item.textContent;
    } else if (item.nodeName === "P") {
      if (ctx && item.textContent) {
        const lines = item.textContent
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
          .map((line) => {
            const matched = /^\[(\d{4})\.(\d+)\] (.+)$/.exec(line);
            if (matched) {
              return {
                year: parseInt(matched[1], 10),
                month: parseInt(matched[2], 10),
                name: matched[3],
              };
            }
          })
          .filter(notNull);
        alumni.set(ctx, lines);
      }
    }
  }
  fs.mkdirSync("members/", { recursive: true });
  fs.writeFileSync(
    "members/alumni.yml",
    YAML.stringify(Object.fromEntries(alumni))
  );
}

scrape();
