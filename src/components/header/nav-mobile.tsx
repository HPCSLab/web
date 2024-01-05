import { type Signal, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { IndexPage } from "~/resource/sitemap";
import { css } from "~/styled-system/css";

interface SitemapEntryProps {
  closed: Signal<boolean>;
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
    <nav class={css({ pl: "6" })}>
      <h3>{title}</h3>
      {children}
    </nav>
  );
}

interface NavProps {
  sitemap: IndexPage[];
  closed: Signal<boolean>;
}

export default component$((props: NavProps) => {
  return (
    <nav class={css({ h: "full" })}>
      <ul>
        {props.sitemap.map((page) => (
          <li key={page.title}>
            <SitemapEntry closed={props.closed} page={page} />
          </li>
        ))}
      </ul>
    </nav>
  );
});
