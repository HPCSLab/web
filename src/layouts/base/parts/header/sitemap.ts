import { getCollection } from "astro:content";

const latestPubYear = [
  ...new Set(
    (await getCollection("publication")).map((pub) => pub.data.year)
  ).values(),
].reduce((a, b) => (a > b ? a : b), 0);

export type SubPage = {
  title: string;
  url: string;
};

type JustLinkIndex = {
  title: string;
  hasChildren: false;
  url: string;
};

type AcordionIndex = {
  title: string;
  hasChildren: true;
  children: SubPage[];
};

export type IndexPage = JustLinkIndex | AcordionIndex;

export const pages: IndexPage[] = [
  {
    title: "Teams",
    hasChildren: true,
    children: [
      {
        title: "卒研配属",
        url: "/bachelor",
      },
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
        title: "Performance",
        url: "/teams/perf",
      },
      {
        title: "PA",
        url: "/teams/pa",
      },
    ],
  },
  {
    title: "Members",
    hasChildren: true,
    children: [
      {
        title: "Members",
        url: "/members",
      },
      {
        title: "Alumnus",
        url: "/members/alumni",
      },
    ],
  },
  {
    title: "News",
    hasChildren: false,
    url: "/news",
  },
  {
    title: "Publications",
    hasChildren: false,
    url: `/publications/${latestPubYear}`,
  },
  {
    title: "Access",
    hasChildren: false,
    url: "/access",
  },
  {
    title: "Link",
    hasChildren: true,
    children: [
      {
        title: "筑波大学",
        url: "https://www.tsukuba.ac.jp/",
      },
      {
        title: "システム情報工学研究群",
        url: "https://www.sie.tsukuba.ac.jp/",
      },
      {
        title: "情報理工学位プログラム",
        url: "https://www.cs.tsukuba.ac.jp/",
      },
      {
        title: "情報科学類",
        url: "https://www.coins.tsukuba.ac.jp/",
      },
      {
        title: "計算科学研究センター",
        url: "https://www.ccs.tsukuba.ac.jp/",
      },
      {
        title: "卒研配属情報",
        url: "http://localhost:5173/bachelor/#!index.md",
      },
      {
        title: "情報システム実験B",
        url: "https://www.hpcs.cs.tsukuba.ac.jp/experiment/text.html",
      },
      {
        title: "Internal",
        url: "http://localhost:5173/internal/pukiwiki/",
      },
    ],
  },
];
