import { Slot, component$ } from "@builder.io/qwik";

interface TeamProps {
  name: string;
}

export default component$((props: TeamProps) => {
  return (
    <section>
      <h2>{props.name}</h2>
      <Slot />
    </section>
  );
});
