import { component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";
import { publications } from "~/resource";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

export const useYears = routeLoader$(async () => {
  const years = new Set((await publications({})).map((pub) => pub.year));
  return [...years.values()];
});

export default component$(() => {
  const years = useYears();
  return (
    <main>
      <h1 class={css({ fontSize: "2xl" })}>Publications</h1>
      <ol>
        {years.value.map((year) => (
          <li key={year}>
            <Link href={`/publications/${year}`}>{year}</Link>
          </li>
        ))}
      </ol>
    </main>
  );
});
