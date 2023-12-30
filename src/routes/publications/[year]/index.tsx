import { type JSXNode, component$ } from "@builder.io/qwik";
import { type StaticGenerateHandler, useLocation, routeLoader$ } from "@builder.io/qwik-city";
import { publications } from "~/resource";
import type { DomesticSubcategory, InternationalSubcategory, Publication } from "~/resource/publications";

export const usePublicationsPerYear = routeLoader$(async (req) => {
  return await publications({year: parseInt(req.params.year, 10)});
});

function classify(publications: Publication[]): {
  journals: Publication[],
  domestics: Map<DomesticSubcategory, Publication[]>
  internationals: Map<InternationalSubcategory, Publication[]>
} {
  const journals: Publication[] = [];
  const internationals: Map<InternationalSubcategory, Publication[]> = new Map();
  const domestics: Map<DomesticSubcategory, Publication[]> = new Map();
  publications.forEach((pub) => {
    switch (pub.class.class) {
      case "journal":
        journals.push(pub);
        break;
      case "domestic": {
        const target = domestics.get(pub.class.subclass);
        if (target) {
          target.push(pub);
        }
        else {
          domestics.set(pub.class.subclass, [pub]);
        }
      }
      break;
      case "international":{
        const target = internationals.get(pub.class.subclass);
        if (target) {
          target.push(pub);
        }
        else {
          internationals.set(pub.class.subclass, [pub]);
        }
      }
      break;
    }
  });
  return {
    journals,
    internationals,
    domestics
  }
}

function PublicationsList(props: {publications: Publication[]}): JSXNode {
  return <ul>
    {
      props.publications.map(journal => <li key={journal.slug}><a  href={`/publications/details/${journal.slug}`}>{journal.reference}</a></li>)
    }
  </ul>
}

function translateDomesticSubcategory(sub: DomesticSubcategory): string {
  switch (sub){
    case "conference":
      return "国内会議";
    case "magazine":
      return "雑誌";
    case "misc":
      return "その他";
    case "poster":
      return "ポスター発表";
    case "workshop":
      return "研究会"
  }
}

function translateInternationalSubcategory(sub: InternationalSubcategory): string {
  switch (sub) {
    case "conference":
      return "国際会議"
    case "poster":
      return "ポスター発表";
  }
}

export default component$(() => {
  const loc = useLocation();
  const publicationsPerYear = usePublicationsPerYear();
  const {journals, internationals, domestics} = classify(publicationsPerYear.value);

  return <main>
    <h1>Publicaions - {loc.params.year}</h1>
    <section>
      <h2>論文誌</h2>
      <PublicationsList publications={journals}/>
    </section>
    <section>
      <h2>国際発表</h2>
      {
        [...internationals.entries()].map(([h3, pubs]) => <section key={h3}>
          <h3>{translateInternationalSubcategory(h3)}</h3>
          <PublicationsList publications={pubs} />
        </section>)
      }
    </section>
    <section>
      <h2>国内発表</h2>
      {
        [...domestics.entries()].map(([h3, pubs]) => <section key={h3}>
          <h3>{translateDomesticSubcategory(h3)}</h3>
          <PublicationsList publications={pubs} />
        </section>)
      }
    </section>
  </main>
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const years = new Set(await publications({}));
  return {
    params: [...years.values()].map((year) => (
     { year: year.toString() }
    )),
  };
};
