import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";
import { LuMenu, LuX } from "@qwikest/icons/lucide";
import { flex } from "~/styled-system/patterns";
import NavMobile from "~/components/header/nav-mobile";
import NavDesktop from "./nav-desktop";
import { sitemap } from "~/resource/sitemap";
import { Link, useLocation } from "@builder.io/qwik-city";

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
  const location = useLocation();
  const currentPath = useSignal(location.url.href);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => location.url.href);
    closed.value = true;
    if (currentPath.value !== location.url.href) {
      scrolled.value = 0;
    }
    currentPath.value = location.url.href;
  });
  const onClick = $(() => {
    if (closed.value) {
      scrolled.value = window.scrollY;
      closed.value = false;
    } else {
      closed.value = true;
    }
  });
  const headerStyleOnClosed = css({
    w: "full",
    position: "sticky",
    top: 0,
    h: "8",
    background: "white",
  });
  const headerStyleOnOpened = css({
    w: "full",
    position: "sticky",
    top: 0,
    h: "8",
    background: "white",
  });
  const NavMobileToggleButton = (
    <button
      class={css({ fontSize: "2xl", m: "1" })}
      onClick$={() => onClick()}
      role="button"
      aria-pressed={!closed.value}
      value={closed.value ? "open menu" : "close menu"}
      aria-label="menu toggle button"
    >
      {closed.value ? <LuMenu /> : <LuX />}
    </button>
  );
  return (
    <>
      <header class={closed.value ? headerStyleOnClosed : headerStyleOnOpened}>
        <div
          class={flex({
            align: "center",
            justify: "space-between",
            pl: "2",
            pr: "2",
            h: "full",
          })}
        >
          <Link href="/">
            <span class={css({ fontSize: "2xl", m: "1", fontWeight: 300 })}>
              HPCS Lab.
            </span>
          </Link>
          <div
            class={css({
              display: {
                base: "none",
                lg: "unset",
              },
              h: "full",
            })}
          >
            <NavDesktop sitemap={sitemap} />
          </div>
          <div
            class={css({
              display: {
                base: "unset",
                lg: "none",
              },
            })}
          >
            {NavMobileToggleButton}
          </div>
        </div>
      </header>
      {closed.value ? null : <NavMobile closed={closed} sitemap={sitemap} />}
    </>
  );
});
