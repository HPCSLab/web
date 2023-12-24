import { component$ } from "@builder.io/qwik";
import { flex } from "~/styled-system/patterns/flex";
import { css } from "~/styled-system/css";

export default component$(() => {
  return (
    <footer
      class={flex({
        background: "gray.600",
        color: "white",
        height: 12,
        justify: "center",
        align: "center",
        position: "sticky",
        top: "100vh",
        bottom: 0,
      })}
    >
      <div>
        <span class={css({ fontSize: "smaller" })}>
          © 2023 High Performance Computing System Laboratory (HPCS Lab.),
          hpcs-web [at] hpcs.cs.tsukuba.ac.jp
        </span>
      </div>
    </footer>
  );
});
