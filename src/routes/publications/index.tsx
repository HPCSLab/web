import { component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";
import { publications } from "~/lib/publications";

export default component$(() => {
  return (
    <main>
      <h1 class={css({ fontSize: "2xl" })}>Publications</h1>
      <ol>
        {[...publications.keys()].map((year) => (
          <li key={year}>
            <a href={`/publications/${year}`}>{year}</a>
          </li>
        ))}
      </ol>
    </main>
  );
});
