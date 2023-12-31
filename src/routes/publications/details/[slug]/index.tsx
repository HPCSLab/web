import { component$ } from "@builder.io/qwik";
import {
  type StaticGenerateHandler,
  routeLoader$,
} from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { publications } from "~/resource";

export const usePublicationDetail = routeLoader$(async (req) => {
  return await publications({ slug: req.params.slug });
});

export default component$(() => {
  const pub = usePublicationDetail();
  if (pub.value.length > 0) {
    return (
      <main>
        <h1>{pub.value[0].title}</h1>
        <div>by {pub.value[0].authors.join(", ")}</div>
        <section>
          <h2>Reference</h2>
          <div>{pub.value[0].reference}</div>
        </section>
        <section>
          <h2>bibtex</h2>
          <pre class={css({ overflowX: "scroll" })}>{pub.value[0].bibtex}</pre>
        </section>
      </main>
    );
  } else {
    return <main></main>;
  }
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const pubs = await publications({});
  return {
    params: pubs.map((pub) => ({ slug: pub.slug })),
  };
};
