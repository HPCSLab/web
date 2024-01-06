import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Heading from "../heading";

interface SectionProps {
  title: string;
  url?: string;
}

export default component$((props: SectionProps) => {
  return (
    <section>
      <Heading level={2}>
        {props.url ? <Link href={props.url}>{props.title}</Link> : props.title}
      </Heading>
      <Slot />
    </section>
  );
});
