import { component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";
import { publications } from "~/resource";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useYears = routeLoader$(async () => {
  const years = new Set((await publications({})).map(pub => pub.year));
  return [...years.values()]
});

export default component$(() => {
  const years = useYears();
  return (
    <main>
      <h1 class={css({ fontSize: "2xl" })}>Publications</h1>
      <ol>
        {years.value.map((year) => (
          <li key={year}>
            <a href={`/publications/${year}`}>{year}</a>
          </li>
        ))}
      </ol>
    </main>
  );
});
