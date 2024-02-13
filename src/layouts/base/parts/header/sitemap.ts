import { getCollection } from "astro:content";

const latestPubYear = [
  ...new Set(
    (await getCollection("publication")).map((pub) => pub.data.year),
  ).values(),
].reduce((a, b) => (a > b ? a : b), 0);

export type SubPage = {
  title: string;
  url: string;
  icon: string;
};

export type JustLinkIndex = {
  title: string;
  hasChildren: false;
  icon: string;
  url: string;
};

export type AcordionIndex = {
  title: string;
  hasChildren: true;
  icon: string;
  children: SubPage[];
};

export type IndexPage = JustLinkIndex | AcordionIndex;

const teamPages = (await getCollection("team")).map((team) => ({
  title: team.data.name,
  url: `/teams/${team.slug}`,
  icon: team.data.icon,
}));

export const pages: IndexPage[] = [
  {
    title: "Teams",
    hasChildren: true,
    icon: "material-symbols:team-dashboard-outline",
    children: [
      {
        title: "卒研配属",
        url: "/bachelor",
        icon: "material-symbols:chat-info-outline-rounded",
      },
      ...teamPages,
    ],
  },
  {
    title: "Members",
    hasChildren: true,
    icon: "material-symbols:groups",
    children: [
      {
        title: "Members",
        url: "/members",
        icon: "material-symbols:groups",
      },
      {
        title: "Alumnus",
        url: "/members/alumni",
        icon: "charm:graduate-cap",
      },
    ],
  },
  {
    title: "News",
    hasChildren: false,
    icon: "material-symbols:breaking-news-alt-1-outline",
    url: "/news",
  },
  {
    title: "Publications",
    hasChildren: false,
    icon: "material-symbols:article-outline",
    url: `/publications/${latestPubYear}`,
  },
  {
    title: "Access",
    hasChildren: false,
    url: "/access",
    icon: "material-symbols:home-pin",
  },
  {
    title: "Link",
    hasChildren: true,
    icon: "material-symbols:link",
    children: [
      {
        title: "筑波大学",
        url: "https://www.tsukuba.ac.jp/",
        icon: "material-symbols:arrow-outward-rounded",
      },
      {
        title: "システム情報工学研究群",
        url: "https://www.sie.tsukuba.ac.jp/",
        icon: "material-symbols:arrow-outward-rounded",
      },
      {
        title: "情報理工学位プログラム",
        url: "https://www.cs.tsukuba.ac.jp/",
        icon: "material-symbols:arrow-outward-rounded",
      },
      {
        title: "情報科学類",
        url: "https://www.coins.tsukuba.ac.jp/",
        icon: "material-symbols:arrow-outward-rounded",
      },
      {
        title: "計算科学研究センター",
        url: "https://www.ccs.tsukuba.ac.jp/",
        icon: "material-symbols:arrow-outward-rounded",
      },
      {
        title: "卒研配属情報",
        url: "http://localhost:5173/bachelor/#!index.md",
        icon: "material-symbols:arrow-outward-rounded",
      },
      {
        title: "情報システム実験B",
        url: "https://www.hpcs.cs.tsukuba.ac.jp/experiment/text.html",
        icon: "material-symbols:arrow-outward-rounded",
      },
      {
        title: "Internal",
        url: "http://localhost:5173/internal/pukiwiki/",
        icon: "material-symbols:login-rounded",
      },
    ],
  },
];
