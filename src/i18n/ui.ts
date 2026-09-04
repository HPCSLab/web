import { DEFAULT_LANG, type Lang } from "./lang";

/**
 * UI 文字列の辞書。
 *
 * 見出しやラベルのような短い文字列はここで一元管理する。
 * コンポーネントを含む本文は `<Lang>` (src/components/i18n/Lang.astro) を使い、
 * 日本語と英語を同じファイルに並べて書く。
 */
const ja = {
  "nav.teams": "Teams",
  "nav.members": "Members",
  "nav.membersList": "Members",
  "nav.alumni": "Alumni",
  "nav.news": "News",
  "nav.publications": "Publications",
  "nav.access": "Access",
  "nav.link": "Link",
  "nav.bachelor": "卒研配属",
  "nav.bachelorLong": "卒研配属情報",

  "link.tsukuba": "筑波大学",
  "link.sie": "システム情報工学研究群",
  "link.cs": "情報理工学位プログラム",
  "link.coins": "情報科学類",
  "link.ccs": "計算科学研究センター",
  "link.experiment": "情報システム実験B",
  "link.internal": "Internal",

  "header.openMenu": "サイドメニューを開く",
  "header.closeMenu": "サイドメニューを閉じる",
  "header.switchLang": "言語を切り替える",

  "index.title": "HPCS Lab.",
  "index.description": "筑波大学 HPCS研究室について",
  "index.about": "About",
  "index.news": "What's news",
  "index.readMore": "さらに読む",
  "index.bachelorLink": "卒研配属情報はこちらから",

  "access.title": "access",
  "access.description": "アクセスマップ",
  "access.heading": "Access",
  "access.address": "Address",
  "access.phone": "Phone",
  "access.telephone": "Telephone",
  "access.fax": "Fax",
  "access.email": "電子メール",
  "access.contact": "お問い合わせ",

  "members.title": "HPCS メンバー",
  "members.description": "HPCS研究室に所属する教員、研究員、学生の一覧",
  "members.faculty": "教員",
  "members.researcher": "研究員",
  "members.student": "学生",
  "members.researchStudent": "研究生",

  "alumni.title": "alumni",
  "alumni.description": "卒業生/退職者一覧",
  "alumni.heading": "Alumni",
  "alumni.faculty": "教員",
  "alumni.staff": "スタッフ",
  "alumni.doctor": "博士",
  "alumni.master": "修士",
  "alumni.bachelor": "学士",

  "news.title": "News",
  "news.description": "HPCS研究室の学会表彰などのニュース一覧",

  "publications.of": "Publications of",
  "publications.journal": "論文誌",
  "publications.international": "国際会議",
  "publications.domestic": "国内会議",
  "publications.mainConference": "本会議",
  "publications.poster": "ポスター",
  "publications.domesticConference": "国内会議",
  "publications.workshop": "研究会",
  "publications.magazine": "雑誌",
  "publications.misc": "その他",
  "publications.bibtex": "BiBTex entry",

  "teams.members": "メンバー",
  "teams.recentWorks": "近年の成果",

  "role.professor": "教授",
  "role.associateProfessor": "准教授",
  "role.assistantProfessor": "助教",
  "role.cooperativeProfessor": "連携大学院教授",
  "role.researcher": "研究員",
  "role.seniorResearcher": "主任研究員",
  "role.researchStudent": "研究生",

  "bachelor.title": "卒研配属情報",
  "bachelor.description": "卒研配属情報と学群四年生向けの研究室紹介",
  "bachelor.lab": "HPCS研究室",
  "bachelor.generalSession": "全体説明会",
  "bachelor.teamSession": "各チームの説明会",
  "bachelor.teamList": "チーム一覧",
  "bachelor.careers": "就職先一覧",
  "bachelor.internship": "インターンシップ",
  "bachelor.capacity": "募集人数",
  "bachelor.capacityUnit": "人",
  "bachelor.noUndergraduate": "※学部での募集は行なっていません",
  "bachelor.session": "説明会",
  "bachelor.tbd": "未定",
  "bachelor.anytime": "随時",
} as const;

export type UIKey = keyof typeof ja;

const en: Record<UIKey, string> = {
  "nav.teams": "Teams",
  "nav.members": "Members",
  "nav.membersList": "Members",
  "nav.alumni": "Alumni",
  "nav.news": "News",
  "nav.publications": "Publications",
  "nav.access": "Access",
  "nav.link": "Links",
  "nav.bachelor": "For Undergraduates",
  "nav.bachelorLong": "Information for Undergraduates",

  "link.tsukuba": "University of Tsukuba",
  "link.sie": "Degree Programs in Systems and Information Engineering",
  "link.cs": "Degree Programs in Computer Science",
  "link.coins": "College of Information Science",
  "link.ccs": "Center for Computational Sciences",
  "link.experiment": "Information Systems Experiment B",
  "link.internal": "Internal",

  "header.openMenu": "Open the side menu",
  "header.closeMenu": "Close the side menu",
  "header.switchLang": "Switch language",

  "index.title": "HPCS Lab.",
  "index.description": "About the HPCS Laboratory, University of Tsukuba",
  "index.about": "About",
  "index.news": "What's news",
  "index.readMore": "Read more",
  "index.bachelorLink": "Information for undergraduates",

  "access.title": "access",
  "access.description": "How to reach us",
  "access.heading": "Access",
  "access.address": "Address",
  "access.phone": "Phone",
  "access.telephone": "Telephone",
  "access.fax": "Fax",
  "access.email": "E-mail",
  "access.contact": "Contact",

  "members.title": "HPCS Members",
  "members.description":
    "Faculty, researchers and students of the HPCS Laboratory",
  "members.faculty": "Faculty",
  "members.researcher": "Researchers",
  "members.student": "Students",
  "members.researchStudent": "Research Students",

  "alumni.title": "alumni",
  "alumni.description": "Former members of the HPCS Laboratory",
  "alumni.heading": "Alumni",
  "alumni.faculty": "Faculty",
  "alumni.staff": "Staff",
  "alumni.doctor": "Doctoral Graduates",
  "alumni.master": "Master's Graduates",
  "alumni.bachelor": "Bachelor's Graduates",

  "news.title": "News",
  "news.description": "News and awards from the HPCS Laboratory",

  "publications.of": "Publications of",
  "publications.journal": "Journals",
  "publications.international": "International Conferences",
  "publications.domestic": "Domestic Conferences",
  "publications.mainConference": "Conference",
  "publications.poster": "Posters",
  "publications.domesticConference": "Conference",
  "publications.workshop": "Workshops",
  "publications.magazine": "Magazines",
  "publications.misc": "Others",
  "publications.bibtex": "BiBTeX entry",

  "teams.members": "Members",
  "teams.recentWorks": "Recent Works",

  "role.professor": "Professor",
  "role.associateProfessor": "Associate Professor",
  "role.assistantProfessor": "Assistant Professor",
  "role.cooperativeProfessor":
    "Professor (Cooperative Graduate School Program)",
  "role.researcher": "Researcher",
  "role.seniorResearcher": "Senior Researcher",
  "role.researchStudent": "Research Student",

  "bachelor.title": "Information for Undergraduates",
  "bachelor.description":
    "Laboratory assignment information for fourth-year undergraduate students",
  "bachelor.lab": "HPCS Laboratory",
  "bachelor.generalSession": "General Information Session",
  "bachelor.teamSession": "Team Information Sessions",
  "bachelor.teamList": "Teams",
  "bachelor.careers": "Career Paths",
  "bachelor.internship": "Internships",
  "bachelor.capacity": "Openings",
  "bachelor.capacityUnit": "",
  "bachelor.noUndergraduate":
    "* This team does not accept undergraduate students.",
  "bachelor.session": "Information Session",
  "bachelor.tbd": "TBD",
  "bachelor.anytime": "By appointment",
};

export const ui: Record<Lang, Record<UIKey, string>> = { ja, en };

/** 指定した言語の翻訳関数を返す */
export function useTranslations(lang: Lang): (key: UIKey) => string {
  const dict = ui[lang] ?? ui[DEFAULT_LANG];
  return (key: UIKey) => dict[key];
}
