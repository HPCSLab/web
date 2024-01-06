import {
  type Signal,
  component$,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { IndexPage } from "~/resource/sitemap";
import styles from "./nav-mobile.module.css";
import Button from "./button";

interface SitemapEntryProps {
  page: IndexPage;
}

function SitemapEntry(props: SitemapEntryProps) {
  const title = props.page.url ? (
    <Link href={props.page.url}>{props.page.title}</Link>
  ) : (
    props.page.title
  );
  const children =
    props.page.children && props.page.children.length > 0 ? (
      <ul>
        {props.page.children.map((page) => (
          <li key={page.title}>
            <Link href={page.url}>{page.title}</Link>
          </li>
        ))}
      </ul>
    ) : null;
  return (
    <nav>
      <h3>{title}</h3>
      {children}
    </nav>
  );
}

interface NavProps {
  sitemap: IndexPage[];
}

export const NavMobileMenuContent = component$((props: NavProps) => {
  return (
    <nav class={styles.contentRoot}>
      <ul>
        {props.sitemap.map((page) => (
          <li key={page.title}>
            <SitemapEntry page={page} />
          </li>
        ))}
      </ul>
    </nav>
  );
});

interface NavToggleButtonProps {
  closed: Signal<boolean>;
}

export const NavMobileToggleButton = component$(
  (props: NavToggleButtonProps) => {
    const scrolled = useSignal(0);
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => {
        track(() => props.closed.value);
        const body = document.querySelector("body");
        if (body) {
          if (props.closed.value) {
            window.scroll(0, scrolled.value);
            body.removeAttribute("style");
          } else {
            body.setAttribute("style", "position: fixed;");
          }
        }
      });
    });
    return (
      <button
        onClick$={() => {
          if (props.closed.value) {
            props.closed.value = false;
          } else {
            props.closed.value = true;
          }
        }}
        class={styles.toggleButton}
        role="button"
        aria-pressed={!props.closed.value}
        value={props.closed.value ? "open menu" : "close menu"}
        aria-label="menu toggle button"
      >
        <Button closed={props.closed} />
      </button>
    );
  },
);
