import { Slot, component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

interface TeamProps {
  name: string;
}

export default component$((props: TeamProps) => {
  return (
    <section class={css({ m: "3" })}>
      <h2 class={css({ fontSize: "2xl" })}>{props.name}</h2>
      <Slot />
    </section>
  );
});
