import { component$ } from "@builder.io/qwik";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

function fallback(props: Props) {
  return (
    <img
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props.alt}
    />
  );
}

const imgs = new Map(
  Object.entries(
    import.meta.glob(`../../public/**/*.jpg`, {
      eager: true,
      as: "jsx",
    }),
  ).map(([key, value]) => {
    return [key.slice("../../public".length, key.length), value];
  }),
) as Map<string, { default: () => any }>;

export default component$((props: Props) => {
  if (typeof window === "undefined") {
    const img = imgs.get(props.src);
    if (img) {
      return img.default();
    } else {
      return fallback(props);
    }
  } else {
    return fallback(props);
  }
});
