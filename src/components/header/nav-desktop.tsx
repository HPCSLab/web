import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuChevronDown } from "@qwikest/icons/lucide";
import type { IndexPage, IndexTitle } from "~/resource/sitemap";
import styles from "./nav-desktop.module.css";

interface Props {
  sitemap: IndexPage[];
}

const menuChildAdhocStyleName = (title: IndexTitle) => {
  switch (title) {
    case "Members":
      return styles.menuChildMembers;
    case "Link":
      return styles.menuChildLink;
    case "Teams":
      return styles.menuChildTeams;
  }
};

const NavHeading = component$((props: { index: IndexPage }) => {
  const hasChildren = props.index.children && props.index.children.length > 0;
  const inner = hasChildren ? (
    <div>
      {props.index.title} <LuChevronDown class={styles.menuChevron} />
    </div>
  ) : (
    props.index.title
  );
  return props.index.url ? (
    <Link href={props.index.url} class={styles.menuHeadingContainer}>
      {inner}
    </Link>
  ) : (
    <span class={styles.menuHeadingContainer}>{inner}</span>
  );
});

const MenuChildren = component$((props: { index: IndexPage }) => {
  if (props.index.children && props.index.children.length > 0) {
    return (
      <ul class={menuChildAdhocStyleName(props.index.title)}>
        {props.index.children.map((page) => (
          <li key={page.url}>
            <Link href={page.url}>{page.title}</Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
});

export default component$((props: Props) => {
  return (
    <nav class={styles.root}>
      <div class={styles.menuParentsContainer}>
        {props.sitemap.map((page) => (
          <div key={page.title} class={styles.menuParent}>
            <NavHeading index={page} />
            <MenuChildren index={page} />
          </div>
        ))}
      </div>
    </nav>
  );
});
