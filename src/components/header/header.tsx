import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";
import { LuMenu, LuX } from "@qwikest/icons/lucide";
import { flex } from "~/styled-system/patterns";
import Nav from "~/components/header/nav";
import { sitemap } from "~/lib/sitemap";

export default component$(() => {
  const closed = useSignal(true);
  const scrolled = useSignal(0);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => {
      const body = document.querySelector("body");
      if (body) {
        if (closed.value) {
          body.removeAttribute("style");
          window.scroll(0, scrolled.value);
        } else {
          body.setAttribute("style", "position: fixed;");
        }
      }
    });
  });
  const onClick = $(() => {
    if (closed.value) {
      scrolled.value = window.scrollY;
      closed.value = false;
    } else {
      closed.value = true;
    }
  });
  return (
    <header
      class={
        closed.value
          ? css({ w: "full", position: "sticky", top: 0, background: "white" })
          : css({
              w: "full",
              position: "sticky",
              top: 0,
              h: "dvh",
              background: "white",
            })
      }
    >
      <div class={flex({ align: "center", justify: "space-between", p: "2" })}>
        <span class={css({ fontSize: "xl", fontWeight: 300 })}>HPCS Lab.</span>
        <button class={css({ fontSize: "xl" })} onClick$={() => onClick()}>
          {closed.value ? <LuMenu /> : <LuX />}
        </button>
      </div>
      {closed.value ? null : <Nav sitemap={sitemap} />}
    </header>
  );
});
