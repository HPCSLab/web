import { Slot, component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export default component$((props: Props) => {
  switch (props.level) {
    case 1:
      return (
        <h1 class={css({ fontSize: "2xl", fontWeight: "bold", m: "2" })}>
          <Slot />
        </h1>
      );
    case 2:
      return (
        <h2
          class={css({
            fontSize: "xl",
            fontWeight: "bold",
            m: "1",
            borderBottomWidth: "thin",
            borderBottomColor: "blue.700",
          })}
        >
          <Slot />
        </h2>
      );
    case 3:
      return (
        <h3 class={css({ fontSize: "x-large" })}>
          <Slot />
        </h3>
      );
    case 4:
      return (
        <h4 class={css({ fontSize: "x-large" })}>
          <Slot />
        </h4>
      );
    case 5:
      return (
        <h5 class={css({ fontSize: "x-large" })}>
          <Slot />
        </h5>
      );
    case 6:
      return (
        <h6 class={css({ fontSize: "x-large" })}>
          <Slot />
        </h6>
      );
  }
});
