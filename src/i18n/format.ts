import type { Lang } from "./lang";

const LOCALE_TAGS: Record<Lang, string> = {
  ja: "ja-JP",
  en: "en-US",
};

/** 説明会などの「月日」を言語に合わせて整形する */
export function formatMonthDay(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE_TAGS[lang], {
    month: lang === "ja" ? "numeric" : "long",
    day: "numeric",
  }).format(date);
}

/** 卒業年月などの「年月」を言語に合わせて整形する */
export function formatYearMonth(
  year: number,
  month: number,
  lang: Lang,
): string {
  return new Intl.DateTimeFormat(LOCALE_TAGS[lang], {
    year: "numeric",
    month: lang === "ja" ? "numeric" : "short",
  }).format(new Date(year, month - 1));
}
