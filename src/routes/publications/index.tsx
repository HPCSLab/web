import { component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

export default component$(() => {
  return (
    <main>
      <h1 class={css({ fontSize: "2xl" })}>Publications</h1>
      <ol></ol>
    </main>
  );
});
