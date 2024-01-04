import { component$ } from "@builder.io/qwik";
import SsrImg from "./static-img";
import { css } from "~/styled-system/css";
import { flex } from "~/styled-system/patterns";

export type Picture = {
  url: string;
  alt: string;
};

interface Props {
  pictures: Picture[];
  transitionDurationMs: number;
}

export default component$((props: Props) => {
  return (
    <div
      class={css({
        scrollSnapType: "x mandatory",
      })}
    >
      <ul class={flex({ overflowX: "scroll", scrollSnapType: "x mandatory" })}>
        {props.pictures.map((pic) => (
          <li
            key={pic.url}
            class={css({
              width: "100vw",
              minWidth: "100vw",
              scrollSnapAlign: "center",
            })}
          >
            <SsrImg src={pic.url} alt={pic.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
});
