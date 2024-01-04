import { component$ } from "@builder.io/qwik";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const imgs = new Map(
  Object.entries(
    import.meta.glob(`../resource/img/**/*.(jpg|png)`, {
      eager: true,
      as: "jsx",
    }),
  ).map(([key, value]) => {
    return [key.slice("../resource/img".length, key.length), value];
  }),
) as Map<string, { default: () => any }>;

export default component$((props: Props) => {
  const img = imgs.get(props.src);
  if (img) {
    return img.default();
  } else {
    throw new Error(`img ${props.src} not found`);
  }
});
