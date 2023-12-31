import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";

interface SectionProps {
  title: string;
  url?: string;
}

export default component$((props: SectionProps) => {
  return (
    <section class={css({ p: 2 })}>
      <h2 class={css({ fontSize: "xl" })}>
        {props.url ? <Link href={props.url}>{props.title}</Link> : props.title}
      </h2>
      <Slot />
    </section>
  );
});
