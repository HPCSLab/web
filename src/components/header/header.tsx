import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  NavMobileMenuContent,
  NavMobileToggleButton,
} from "~/components/header/nav-mobile";
import NavDesktop from "./nav-desktop";
import { sitemap } from "~/resource/sitemap";
import { Link, useLocation } from "@builder.io/qwik-city";
import styles from "./header.module.css";

export default component$(() => {
  const closed = useSignal(true);
  const scrolled = useSignal(0);

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
  return (
    <>
      <header class={styles.root}>
        <Link href="/">
          <span>HPCS Lab.</span>
        </Link>
        <div class={styles.desktopMenuEntries}>
          <NavDesktop sitemap={sitemap} />
        </div>
        <div class={styles.menuToggleButton}>
          <NavMobileToggleButton closed={closed} />
        </div>
      </header>
      <div class={closed.value ? styles.hide : ""}>
        <NavMobileMenuContent sitemap={sitemap} />
      </div>
    </>
  );
});
