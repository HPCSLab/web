import { getCollection } from "astro:content";
import { bachelorPageEnable } from "src/site.config";
import { localePath, type Lang } from "@i18n/lang";
import { useTranslations } from "@i18n/ui";

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

export function getBachelorPage(lang: Lang): JustLinkIndex {
  return {
    title: useTranslations(lang)("nav.bachelor"),
    url: localePath(lang, "/bachelor"),
    hasChildren: false,
    icon: "material-symbols:chat-info-outline-rounded",
  };
}

const teams = await getCollection("team");

/** 言語ごとのナビゲーション定義を組み立てる */
export function getSitemap(lang: Lang): IndexPage[] {
  const t = useTranslations(lang);
  const teamPages = teams.map((team) => ({
    title: team.data.name,
    url: localePath(lang, `/teams/${team.id}`),
    icon: team.data.icon,
  }));

  return [
    {
      title: t("nav.teams"),
      hasChildren: true,
      icon: "material-symbols:team-dashboard-outline",
      children: bachelorPageEnable
        ? [getBachelorPage(lang), ...teamPages]
        : teamPages,
    },
    {
      title: t("nav.members"),
      hasChildren: true,
      icon: "material-symbols:groups",
      children: [
        {
          title: t("nav.membersList"),
          url: localePath(lang, "/members"),
          icon: "material-symbols:groups",
        },
        {
          title: t("nav.alumni"),
          url: localePath(lang, "/members/alumni"),
          icon: "charm:graduate-cap",
        },
      ],
    },
    {
      title: t("nav.news"),
      hasChildren: false,
      icon: "material-symbols:breaking-news-alt-1-outline",
      url: localePath(lang, "/news"),
    },
    {
      title: t("nav.publications"),
      hasChildren: false,
      icon: "material-symbols:article-outline",
      url: localePath(lang, `/publications/${latestPubYear}`),
    },
    {
      title: t("nav.access"),
      hasChildren: false,
      url: localePath(lang, "/access"),
      icon: "material-symbols:home-pin",
    },
    {
      title: t("nav.link"),
      hasChildren: true,
      icon: "material-symbols:link",
      children: [
        {
          title: t("link.tsukuba"),
          url: "https://www.tsukuba.ac.jp/",
          icon: "material-symbols:arrow-outward-rounded",
        },
        {
          title: t("link.sie"),
          url: "https://www.sie.tsukuba.ac.jp/",
          icon: "material-symbols:arrow-outward-rounded",
        },
        {
          title: t("link.cs"),
          url: "https://www.cs.tsukuba.ac.jp/",
          icon: "material-symbols:arrow-outward-rounded",
        },
        {
          title: t("link.coins"),
          url: "https://www.coins.tsukuba.ac.jp/",
          icon: "material-symbols:arrow-outward-rounded",
        },
        {
          title: t("link.ccs"),
          url: "https://www.ccs.tsukuba.ac.jp/",
          icon: "material-symbols:arrow-outward-rounded",
        },
        ...(bachelorPageEnable
          ? [
              {
                title: t("nav.bachelorLong"),
                url: "/bachelor/#!index.md",
                icon: "material-symbols:arrow-outward-rounded",
              },
            ]
          : []),
        {
          title: t("link.experiment"),
          url: "/experiment/text.html",
          icon: "material-symbols:arrow-outward-rounded",
        },
        {
          title: t("link.internal"),
          url: "/internal/",
          icon: "material-symbols:login-rounded",
        },
      ],
    },
  ];
}
