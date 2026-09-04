/**
 * 多言語対応の中核。
 *
 * このサイトは 1 つのページファイルから日英両方の HTML を生成する。
 * ルーティングは `src/pages/[...lang]/` の rest パラメータが担い、
 * デフォルト言語 (日本語) は接頭辞なし、英語は `/en/` 配下に出力される。
 */

export const LANGS = ["ja", "en"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "ja";

/** 各言語の表示名。言語切り替えボタンで使う */
export const LANG_NAMES: Record<Lang, string> = {
  ja: "日本語",
  en: "English",
};

/** 言語切り替えボタンに出す短縮ラベル */
export const LANG_SHORT_NAMES: Record<Lang, string> = {
  ja: "JA",
  en: "EN",
};

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}

/** `[...lang]` パラメータから言語を判定する */
export function langFromParam(param: string | undefined): Lang {
  return isLang(param) ? param : DEFAULT_LANG;
}

/**
 * URL から言語を判定する。
 * `Astro.params` を辿れない場所 (MDX 本文中のコンポーネントなど) でも使える。
 */
export function langFromUrl(url: URL): Lang {
  const head = url.pathname.split("/").filter(Boolean)[0];
  return isLang(head) && head !== DEFAULT_LANG ? head : DEFAULT_LANG;
}

/** 言語を `[...lang]` パラメータに戻す。デフォルト言語は接頭辞を付けない */
export function langParam(lang: Lang): string | undefined {
  return lang === DEFAULT_LANG ? undefined : lang;
}

/**
 * `getStaticPaths` 用。渡したパラメータの集合と全言語の直積を返す。
 * 動的ルートは `withLangs(ids.map((id) => ({ id })))` のように使う。
 */
export function withLangs<P extends Record<string, string>>(
  paths: readonly P[],
): { params: P & { lang: string | undefined } }[] {
  return LANGS.flatMap((lang) =>
    paths.map((params) => ({
      params: { ...params, lang: langParam(lang) },
    })),
  );
}

/** 言語でのみ分岐する静的ページ用の `getStaticPaths` */
export function langPaths(): { params: { lang: string | undefined } }[] {
  return withLangs([{}]);
}

/** 言語に対応したパスを組み立てる。`localePath("en", "/news")` -> `/en/news` */
export function localePath(lang: Lang, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) {
    return normalized;
  }
  return normalized === "/" ? `/${lang}/` : `/${lang}${normalized}`;
}

/**
 * 現在の URL に対応する別言語のパスを返す。
 * 言語切り替えボタンが同じページに留まるために使う。
 */
export function switchLangPath(url: URL, to: Lang): string {
  const segments = url.pathname.split("/").filter(Boolean);
  const head = segments[0];
  if (isLang(head) && head !== DEFAULT_LANG) {
    segments.shift();
  }
  return localePath(to, `/${segments.join("/")}`);
}

/**
 * 日本語フィールドと `_en` フィールドから現在の言語の値を選ぶ。
 * 英語が未翻訳 (null / undefined) なら日本語にフォールバックする。
 */
export function localized<T>(lang: Lang, ja: T, en?: T | null): T {
  return lang === "en" && en !== null && en !== undefined ? en : ja;
}

/** 属性値など、コンポーネントを使えない場所で日英を切り替える */
export function pick<T>(lang: Lang, values: { ja: T; en?: T | undefined }): T {
  return localized(lang, values.ja, values.en);
}
