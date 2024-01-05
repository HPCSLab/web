import { type Signal, component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuChevronDown } from "@qwikest/icons/lucide";
import type { IndexPage, IndexTitle } from "~/resource/sitemap";
import { css } from "~/styled-system/css";
import { flex } from "~/styled-system/patterns";

interface Props {
  sitemap: IndexPage[];
}

const NavHeading = component$(
  (props: {
    index: IndexPage;
    current: Signal<null | IndexTitle>;
    holdMenu: Signal<boolean>;
  }) => {
    const hasChildren = props.index.children && props.index.children.length > 0;
    const inner = hasChildren ? (
      <div class={flex({ direction: "row", align: "center" })}>
        {props.index.title} <LuChevronDown class={css({ ml: "1" })} />
      </div>
    ) : (
      props.index.title
    );
    return (
      <div
        class={flex({ h: "full", justify: "center", align: "center" })}
        onMouseOver$={() => {
          props.current.value = props.index.title;
        }}
        onMouseLeave$={() => {
          setTimeout(() => {
            if (
              props.current.value === props.index.title &&
              !props.holdMenu.value
            ) {
              props.current.value = null;
            }
          }, 100);
        }}
      >
        {props.index.url ? <Link href={props.index.url}>{inner}</Link> : inner}
      </div>
    );
  },
);

export default component$((props: Props) => {
  const current = useSignal<null | IndexTitle>(null);
  const holdMenu = useSignal(false);
  const enabledLinks = css({
    pos: "absolute",
    // 50remは適当
    maxHeight: "20rem",
    width: "full",

    bgColor: "white",
    borderWidth: "thin",
    borderColor: "blue.700",

    overflowY: "hidden",
    transitionProperty: "max-height",
    transitionDuration: "300ms",
    transitionTimingFunction: "linear",
  });
  const disabledLinks = css({
    pos: "absolute",
    maxHeight: "0",
    width: "full",

    bgColor: "white",
    borderWidth: "thin",
    borderColor: "blue.700",

    overflowY: "hidden",
    transitionProperty: "max-height",
    transitionDuration: "300ms",
    transitionTimingFunction: "linear",
  });
  return (
    <nav class={css({ h: "full" })}>
      <div
        class={flex({
          direction: "row",
          position: "relative",
          h: "full",
        })}
      >
        {props.sitemap.map((page) => (
          <div key={page.title} class={css({ ml: "1", mr: "1", h: "full" })}>
            <NavHeading index={page} current={current} holdMenu={holdMenu} />
          </div>
        ))}
      </div>
      <nav class={css({ pos: "relative" })}>
        {
          <div
            class={flex({
              direction: "row",
              pos: "absolute",
              w: "full",
              bgColor: "white",
            })}
            onMouseOver$={() => {
              holdMenu.value = true;
            }}
            onMouseLeave$={() => {
              holdMenu.value = false;
              current.value = null;
            }}
          >
            {props.sitemap.map((page) =>
              page.children && page.children.length > 0 ? (
                <ul
                  key={page.title}
                  class={
                    page.title === (current.value || current.value)
                      ? enabledLinks
                      : disabledLinks
                  }
                >
                  {page.children.map((page) => (
                    <li
                      key={page.url}
                      class={css({
                        m: "1",
                        borderBottomWidth: "thin",
                        borderBottomColor: "blue.700",
                      })}
                    >
                      <Link href={page.url}>
                        <div class={css({ width: "full" })}>{page.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null,
            )}
          </div>
        }
      </nav>
    </nav>
  );
});
