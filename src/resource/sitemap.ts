export type SubPage = {
  title: string;
  url: string;
};

export type IndexTitle =
  | "Home"
  | "Teams"
  | "卒研配属"
  | "Members"
  | "News"
  | "Publications"
  | "Access"
  | "Link";

export type IndexPage = {
  title: IndexTitle;
  url?: string;
  children?: SubPage[];
};

export const sitemap: IndexPage[] = [
  {
    title: "Teams",
    url: "/teams",
    children: [
      {
        title: "Algorithm",
        url: "/teams/algo",
      },
      {
        title: "System Software",
        url: "/teams/ss",
      },
      {
        title: "FPGA",
        url: "/teams/fpga",
      },
      {
        title: "Architecture",
        url: "/teams/arch",
      },
      {
        title: "PA",
        url: "/teams/pa",
      },
    ],
  },
  {
    title: "Members",
    url: "/members",
    children: [
      {
        title: "Members",
        url: "/members/",
      },
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
