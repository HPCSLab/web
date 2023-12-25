import { component$ } from "@builder.io/qwik";
import { type StaticGenerateHandler, useLocation } from "@builder.io/qwik-city";
import * as Publications from "~/resource/publications";

function presentationalHeading(cls: Publications.PublicationClass): {
  h2: string;
  h3?: string;
} {
  switch (cls.class) {
    case "journal":
      return { h2: "論文誌" };
    case "domestic":
      switch (cls.subclass) {
        case "conference":
          return { h2: "国内", h3: "国内会議" };
        case "magazine":
          return { h2: "国内", h3: "雑誌" };
        case "misc":
          return { h2: "国内", h3: "その他" };
        case "poster":
          return { h2: "国内", h3: "ポスター発表" };
        case "workshop":
          return { h2: "国内", h3: "研究会" };
      }
      break;
    case "international":
      switch (cls.subclass) {
        case "conference":
          return { h2: "国外", h3: "国際会議" };
        case "poster":
          return { h2: "国外", h3: "ポスター発表" };
      }
      break;
  }
}

export default component$(() => {
  const loc = useLocation();
  const publications = Publications.publications.get(
    parseInt(loc.params.year, 10),
  );
  if (publications) {
    const classifiedByH2Heading: Map<
      "international" | "journal" | "domestic",
      Map<Publications.PublicationClass, Publications.Publication[]>
    > = new Map();
    for (const [cls, pubs] of publications) {
      if (classifiedByH2Heading.get(cls.class) === undefined) {
        classifiedByH2Heading.set(cls.class, new Map([[cls, pubs]]));
      } else {
        classifiedByH2Heading.get(cls.class)?.set(cls, pubs);
      }
    }
    return (
      <main>
        <h1>Publications - {loc.params.year}</h1>
        {[...classifiedByH2Heading.values()].sort().map((pubs) => {
          const sampleClass = [...pubs.keys()][0];
          const h2heading = presentationalHeading(sampleClass).h2;
          return (
            <section key={sampleClass.class}>
              <h2>{h2heading}</h2>
              {[...pubs.entries()].map(([cls, list]) => {
                const h3heading = presentationalHeading(cls).h3;
                if (h3heading) {
                  return (
                    <section key={JSON.stringify(cls)}>
                      <h3>{h3heading}</h3>
                      <ul>
                        {list.map((pub) => (
                          <li key={pub.slug}>
                            <a href={`/publications/details/${pub.slug}`}>
                              {pub.reference}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                } else {
                  return (
                    <ul key={JSON.stringify(cls)}>
                      {list.map((pub) => (
                        <li key={pub.slug}>
                          <a href={`/publications/details/${pub.slug}`}>
                            {pub.reference}
                          </a>
                        </li>
                      ))}
                    </ul>
                  );
                }
              })}
            </section>
          );
        })}
      </main>
    );
  } else {
    return <main></main>;
  }
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [...Publications.publications.keys()].map((year) => {
      return { year: year.toString() };
    }),
  };
};
