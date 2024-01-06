import { Signal, component$ } from "@builder.io/qwik";
import styles from "./button.module.css";

interface Props {
  closed: Signal<boolean>;
}

export default component$((props: Props) => {
  const topBarStyleBase = `${styles.topBar} ${styles.bar}`;
  const bottomBarStyleBase = `${styles.bottomBar} ${styles.bar}`;
  const topBarStyle = props.closed.value
    ? topBarStyleBase
    : `${topBarStyleBase} ${styles.topBarOpened}`;
  const bottomBarStyle = props.closed.value
    ? bottomBarStyleBase
    : `${bottomBarStyleBase} ${styles.bottomBarOpened}`;
  return (
    <div class={styles.root}>
      <div class={topBarStyle}></div>
      <div class={bottomBarStyle}></div>
    </div>
  );
});
