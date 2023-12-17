import { component$ } from "@builder.io/qwik";
import type { Page } from "~/lib/sitemap";
import { css } from "~/styled-system/css";

interface SitemapEntryProps {
  page: Page;
}

function SitemapEntry(props: SitemapEntryProps) {
  const title = props.page.url ? (
    <a href={props.page.url}>{props.page.title}</a>
  ) : (
    props.page.title
  );
  const children =
    props.page.children && props.page.children.length > 0 ? (
      <ul>
        {props.page.children.map((page) => (
          <li key={page.title}>
            <SitemapEntry page={page} />
          </li>
        ))}
      </ul>
    ) : null;
  return (
    <nav class={css({ pl: "6" })}>
      <h3>{title}</h3>
      {children}
    </nav>
  );
}

interface NavProps {
  sitemap: Page[];
}

export default component$((props: NavProps) => {
  return (
    <nav>
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
