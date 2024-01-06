import { component$ } from "@builder.io/qwik";
import SsrImg from "./static-img";
import styles from "./carousel.module.css";

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
    <div>
      <ul class={styles.container}>
        {props.pictures.map((pic) => (
          <li key={pic.url}>
            <SsrImg src={pic.url} alt={pic.alt} />
            <div>
              <span>{pic.alt}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
