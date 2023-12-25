export type Page = {
  title: string;
  url?: string;
  children?: Page[];
};

export const sitemap: Page[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Research",
    url: "/research",
  },
  {
    title: "Members",
    url: "/members",
    children: [
      {
        title: "Alumni",
        url: "/members/alumni",
      },
    ],
  },
  {
    title: "News",
    url: "/news",
  },
  {
    title: "Publications",
    url: "/publications",
  },
  {
    title: "Open Lab.",
    url: "/bachelor/#!index.md",
  },
  {
    title: "Access",
    url: "/access",
  },
  {
    title: "Link",
    children: [
      {
        title: "筑波大学",
        url: "https://www.tsukuba.ac.jp",
      },
      {
        title: "システム情報工学研究群",
        url: "https://www.sie.tsukuba.ac.jp",
      },
      {
        title: "情報理工学位プログラム",
        url: "https://www.cs.tsukuba.ac.jp",
      },
      {
        title: "情報科学類",
        url: "https://www.coins.tsukuba.ac.jp",
      },
      {
        title: "計算科学研究センター",
        url: "https://www.ccs.tsukuba.ac.jp",
      },
      {
        title: "卒研配属情報",
        url: "/bachelor/#!index.md",
      },
      {
        title: "情報システム実験B",
        url: "https://www.hpcs.cs.tsukuba.ac.jp/experiment/text.html",
      },
      {
        title: "Internal Page",
        url: "/internal/pukiwiki/",
      },
    ],
  },
];
