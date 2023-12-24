import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { publicationsBySlug } from "~/lib/publications";
import { css } from "~/styled-system/css";

export default component$(() => {
  const loc = useLocation();
  const pub = publicationsBySlug.get(loc.params.slug);
  if (pub) {
    return (
      <main>
        <h1>{pub.title}</h1>
        <div>by {pub.authors.join(", ")}</div>
        <section>
          <h2>Reference</h2>
          <div>{pub.reference}</div>
        </section>
        <section>
          <h2>bibtex</h2>
          <pre class={css({ overflowX: "scroll" })}>{pub.bibtex}</pre>
        </section>
      </main>
    );
  } else {
    return <main></main>;
  }
});
