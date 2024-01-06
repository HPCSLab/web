import { Slot, component$ } from "@builder.io/qwik";

interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export default component$((props: Props) => {
  switch (props.level) {
    case 1:
      return (
        <h1>
          <Slot />
        </h1>
      );
    case 2:
      return (
        <h2>
          <Slot />
        </h2>
      );
    case 3:
      return (
        <h3>
          <Slot />
        </h3>
      );
    case 4:
      return (
        <h4>
          <Slot />
        </h4>
      );
    case 5:
      return (
        <h5>
          <Slot />
        </h5>
      );
    case 6:
      return (
        <h6>
          <Slot />
        </h6>
      );
  }
});
