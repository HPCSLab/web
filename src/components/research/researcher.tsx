import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface ResearcherProps {
  name: string;
  url: string;
}

export default component$((props: ResearcherProps) => {
  return (
    <section>
      <h3>{props.name}</h3>
      <Slot />
      <nav>
        <Link href={props.url}>教員個人ページはこちらから</Link>
      </nav>
    </section>
  );
});
