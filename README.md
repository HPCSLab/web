# hpcs-web

現在の管理者:

- [@namachan10777](https://github.com/namachan10777)

## 更新方法

### 必要なツール

- `node`, `npm`
- `pnpm`
  - `npm install -g pnpm`でインストールしても良い

### 開発環境の構築

上記ツールをインストールした上で、プロジェクトのルートディレクトリで

```sh
pnpm install
pnpm run dev
```

とすると`localhost`でのプレビューページのリンクがターミナルに表示されるのでそこにアクセスする。
ファイルを更新しつつ表示が問題ないか確かめ、完成したら

```sh
pnpm run fix:fmt
pnpm run build
```

をしてエラーと警告が出ないかを確認し、問題なければPullRequestを出して管理者にレビューをもらう。
ブランチは`fix/*`、`feature/*`、`chore/*`などの名前で切ることを推奨する。

## ファイル構成

Web係が通常編集対象とするのは以下のファイルです。
他のページは以下のファイルの更新に合わせて更新されるので編集は不要です。

| パス                          | 内容                             |
| :---------------------------- | :------------------------------- |
| `src/asset/team/*/`           | 各チームの紹介ページ用の画像     |
| `src/content/alumni/*.yml`    | 卒業生のデータ                   |
| `src/content/carousel/*.yml`  | トップページに出るクラスタの定義 |
| `src/content/carousel/img/*`  | トップページに出るクラスタの画像 |
| `src/content/member/*.yml`    | 現役メンバーの情報               |
| `src/content/member/icons/*`  | 現役メンバーのアイコン           |
| `src/news/:year/*.mdx`        | ニュース記事                     |
| `src/news/:year/img/*`        | ニュース記事で使う画像           |
| `src/publication/:year/*.yml` | 出版物                           |
| `src/team/*.mdx`              | 各チームの紹介ページ             |
| `src/team/cover/*`            | 各チーム紹介ページのカバー画像   |

### `src/content/alumni/*.yml`

| プロパティ | 意味                                           |
| :--------- | :--------------------------------------------- |
| `year`     | 卒業/退官年度                                  |
| `month`    | 卒業月（`type: faculty`以外は必要）            |
| `name`     | 英語表記での名前                               |
| `type`     | `faculty`, `doctor`, `master`, `undergraduate` |

### `src/content/carousel/*.yml`

| プロパティ | 意味                     |
| :--------- | :----------------------- |
| `src`      | 画像ファイルへの相対パス |
| `name`     | 名前                     |

### `src/content/member/*.yml`

| プロパティ    | 意味                                                  |
| :------------ | :---------------------------------------------------- |
| `name`        | 日本語表記での名前。無くても良い                      |
| `eng_name`    | 英語表記での名前                                      |
| `occupation`  | `Faculty`, `Researcher`, `Student`, `ResearchStudent` |
| `grade`       | `Faculty`, `Student`の場合は必須。                    |
| `team`        | `algo`, `arch`, `perf`, `pa`, `fpga`, `ss`            |
| `icon`        | yamlファイルからの相対パス                            |
| `username`    | LDAPに登録されるユーザーネーム                        |
| `keywords`    | 必須ではない。キーワードのリスト                      |
| `keywords_en` | 必須ではない。`keywords`の英語版                      |
| `message`     | チーム紹介ページに記載されるメッセージ                |
| `message_en`  | 必須ではない。`message`の英語版                       |

`grade`の詳細は以下。必要に応じて追加するのも可能ですが、
どう修正すればいいかわからない場合はadminないしweb係に相談してください。

| `grade` （`Faculty`）                              | 説明           |
| :------------------------------------------------- | :------------- |
| `Assistant Professor`                              | 助教           |
| `Associate Professor`                              | 准教授         |
| `Professor`                                        | 教授           |
| `Professor (Cooperative Gradutate School Program)` | 連携大学院教授 |

| `grade` （`Student`） | 説明 |
| :-------------------- | :--- |
| `D3`                  | D3   |
| `D2`                  | D2   |
| `D1`                  | D1   |
| `M2`                  | M2   |
| `M1`                  | M1   |
| `B4`                  | B4   |

### `src/news/:year/*.mdx`

| frontmatterのプロパティ | 意味                                            |
| :---------------------- | :---------------------------------------------- |
| `title`                 | タイトル                                        |
| `title_en`              | 必須ではない。`title`の英語版                   |
| `description`           | 内容の簡潔な説明                                |
| `description_en`        | 必須ではない。`description`の英語版             |
| `date`                  | `yyyy-mm-dd`形式での発表日                      |
| `published`             | 公開するかしないか。`false`にすると公開されない |

Markdownの拡張であるMDXで記述。`<h1>`は自動で挿入されるので`<h2>`以下を使うこと。
また、`@components/...`とすると他のページで使われるコンポーネントも使用可能。
`@components/display/Youtube.astro`など。

### `src/publication/:year/*.yml`

| プロパティ  | 説明                                                               |
| :---------- | :----------------------------------------------------------------- |
| `title`     | タイトル                                                           |
| `booktitle` | 学会名、ジャーナル名など                                           |
| `year`      | 発表年                                                             |
| `authors`   | 名前のリスト。正規化はされないので英語名でも日本語名でも大丈夫です |
| `bibtex`    | bibtexのエントリ                                                   |
| `reference` | plaintextでのリファレンス                                          |
| `class`     | 詳細は下記                                                         |

#### `class`

- `journal`
- `international`
  - `conference`
  - `poster`
- `domestic`
  - `conference`
  - `poster`
  - `workshop`
  - `magazine`
  - `misc`

現在用意されている分類は上記の通り。
`src/content/config.ts`の編集で追加は可能ですが、日本語への翻訳があるので少し面倒です。
どう分類するかは過去のファイルを参考にしてください

### `src/content/team/*.mdx`

| frontmatterのプロパティ | 説明                                           |
| :---------------------- | :--------------------------------------------- |
| `cover.src`             | カバー画像への相対パス                         |
| `cover.alt`             | カバー画像の代替テキスト                       |
| `cover.alt_en`          | 必須ではない。`cover.alt`の英語版              |
| `name`                  | チーム名                                       |
| `icon`                  | チームアイコン。`iconify-json`のものが使えます |
| `color`                 | チーム色                                       |

| `description` | チームの簡潔な説明。卒研配属ページなどに表示される |
| `description_en` | 必須ではない。`description`の英語版 |
| `bachelorInfo.capacities` | 受入人数。受け入れ教員と人数を記述する。既存のファイルを参考にすること |
| `bachelorInfo.informationSessions` | 説明会の詳細の配列。詳細は下記別表に |

#### `bachelorInfo.informationSessions`

| プロパティ        | 説明                                                                                                                                                                               |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `day`             | `yyyy-mm-dd`形式での説明会開催日。記述しないと「随時」となる                                                                                                                       |
| `hour`            | `hh:mm`形式での説明会開始時刻と終了時刻。記述しないと「随時」となる                                                                                                                |
| `place.display`   | 場所の人間向け文字列。`総合研究棟B 1124`など                                                                                                                                       |
| `place.canonical` | 完全な場所の表記。`筑波大学 総合研究棟B 1124`など                                                                                                                                  |
| `note`            | オプショナル。特別に記載したいことがある場合は利用する                                                                                                                             |
| `recentWorks`     | チーム紹介ページに近年の研究成果として表示したい論文のリスト。論文の詳細は`src/content/publication`以下のものを使うので、`src/content/publication`以下に追加してからslugで参照する |

記述はMDXで行う。`@component/...`をimport出来るのでそれらを利用して記述する。
`recentWorks`、カバー画像、メンバー紹介などは自動で追加されるため、
教員ごとの紹介とその他研究室紹介のみを記述する。

## 多言語対応（日本語 / 英語）

全てのページに英語版があります。日本語版は今までどおり `/`、英語版は `/en/` 以下に出力されます。

**日本語と英語で別々のファイルを編集する必要はありません。** 1つのファイルに日英を並べて書きます。

### 記事やページの本文を日英で書く

`<Lang>` を使い、`ja` と `en` のスロットに両方の言語を並べて書きます。
`en` スロットを省略すると、英語版のページでも日本語がそのまま表示されます（未翻訳のフォールバック）。

MDX（ニュース記事、チーム紹介ページ）での書き方:

```mdx
---
title: "日本語のタイトル"
title_en: "English title"
description: "日本語の説明"
description_en: "English description"
date: "2026-01-30"
published: true
---

import Lang from "@components/i18n/Lang.astro";

<Lang>
<Fragment slot="ja">

日本語の本文をここに書く。

> **引用や強調もそのまま使える**

</Fragment>
<Fragment slot="en">

Write the English body here.

> **Quotes and emphasis work the same way**

</Fragment>
</Lang>
```

> [!IMPORTANT]
> `<Fragment slot="...">` の直後と `</Fragment>` の直前には**必ず空行を入れてください**。
> 空行がないとMDXが中身をMarkdownとして解釈せず、ビルドが壊れます。

`.astro` のページでも同じように書けます。

```astro
---
import Lang from "@components/i18n/Lang.astro";
---

<Lang>
  <Fragment slot="ja">
    <Typography>日本語の本文</Typography>
  </Fragment>
  <Fragment slot="en">
    <Typography>English text</Typography>
  </Fragment>
</Lang>
```

### コンテンツの英語版フィールド

yamlやfrontmatterの項目は、`_en` を付けたフィールドを足すと英語版で使われます。
省略した場合は日本語がそのまま表示されます。

| 対象                       | 追加できるフィールド                                        |
| :------------------------- | :---------------------------------------------------------- |
| `content/news/:year/*.mdx` | `title_en`, `description_en`                                |
| `content/team/*.mdx`       | `description_en`, `cover.alt_en`                            |
| `content/member/*.yml`     | `message_en`, `keywords_en`（名前は既存の`eng_name`を使用） |

`content/publication` と `content/alumni` は書誌情報と人名なので英語版フィールドはありません。

### 見出しやボタンなどの短い文字列

ページ内の短いUI文字列は `src/i18n/ui.ts` の辞書にまとめてあります。
新しい文字列を足すときは `ja` と `en` の両方に同じキーを足してください（片方だけだと型エラーになります）。

```ts
// src/i18n/ui.ts
const ja = {
  "members.faculty": "教員",
  // ...
};

const en: Record<UIKey, string> = {
  "members.faculty": "Faculty",
  // ...
};
```

ページ側では次のように使います。

```astro
---
import { langPaths, langFromParam } from "@i18n/lang";
import { useTranslations } from "@i18n/ui";

export const getStaticPaths = langPaths;

const lang = langFromParam(Astro.params.lang);
const t = useTranslations(lang);
---

<h2>{t("members.faculty")}</h2>
```

### 新しいページを追加するとき

ページは `src/pages/[...lang]/` 以下に置きます。ファイルは1つだけで、日英2つのURLが生成されます。
`getStaticPaths` に言語を渡す必要があるので、次のどちらかを使ってください。

- 言語でのみ分岐する普通のページ … `export const getStaticPaths = langPaths;`
- 動的ルート … `withLangs()` で他のパラメータと組み合わせる

```ts
// 例: src/pages/[...lang]/teams/[id].astro
export async function getStaticPaths() {
  const teams = await getCollection("team");
  return withLangs(teams.map((team) => ({ id: team.id })));
}
```

ページ内のリンクは `localePath(lang, "/news")` を通してください。
日本語なら `/news`、英語なら `/en/news` になります。直書きすると英語版から日本語版へ飛んでしまいます。

## インフラ（admin向け）

前段が`traefik`でTLS終端を行う。このページ本体のサーブは`nginx`。
設定ファイルと`Dockerfile`は`infra/`に置かれている。

TLS終端は`traefik`に集約。`/etc/pki/www`以下の鍵を使う。
`docker-compose.yml`があるがあくまで参考程度なので、実際には`systemd`で個別にdockerコンテナを動かすので良いと思う。
`fallback-http`と`fallback-https`は従来のWebサーバーをDockerコンテナ化したもの。

## Design Docs（管理者向け）

### フロントエンド

2024年まではWordPressを使いページを作成し、それを静的ページに吐き出す`StaticPress`プラグインを使ってサイトを構築していた。
しかし`StaticPress`プラグインの更新が停止しページ更新が不可能になったため、何らかの手段での解決が求められていた。

PHPはメンテナンスコストがかかるため何らかのJavaScriptでのフロントエンドフレームワークへの乗り換えを行うこととした。
ここでフレームワーク選定を行う上での考慮事項は以下の通りである。

- フレームワークの将来性、及び現状での普及度
  - 永遠にメンテナンスし続けることは不可能だが、ある程度は安定して使えることが望ましい。
  - `Next`は`Pages Router`から`App Router`への移行など、安定性にやや不安がある
  - `SvelteKit`はある程度普及を見せている
  - `Qwik`は早すぎる
  - `Vue`系は今後が不安
- 静的ページへの書き出し
  - NodeJSコンテナでサーブし前段のnginxでキャッシュするのは当然考えられるが、
    静的ファイルへ書き出せるに越したことはない
  - `Next`などのSSR系フレームワークは静的エクスポートはあくまでおまけである
  - いっそ`Remix`に振るのも良いが、基幹系でのコンテナの運用体制が整うまでは静的ファイルで使いたい
  - `Astro`は静的ファイルを第一においており、かなり有力
- コンテンツ管理
  - `yaml`ファイルで簡単にコンテンツ管理が出来ることが望ましい。`Next`、`Qwik`などでも工夫すれば可能ではあるがやや面倒
  - Headless CMSは自前でホスティングするにせよ外部のものを使うにせよ運用コストがかかる。また移行も面倒になる
  - `Astro`は`src/content`以下にファイルを置くことで簡易的なコンテンツ管理が可能である。

上記のことを考慮し、`Astro`を採用した。
動的な部分についてはReactなどは用いず`WebComponents`をShadow DOMを使わずに利用する方向とした。
他のSPAフレームワークの導入によるバンドルサイズの増大の抑制と、
必要な学習コストをWeb標準に寄せるのが`WebComponents`採用の理由である。

Shadow DOMを使っていないのは2024年2月時点ではFirefoxがDeclarative Shadow DOMをサポートしていなかったこと、
AstroのCSSのスコーピング機能と統合することが理由である。

また、CSSフレームワークについても別で導入は行わず、AstroのCSSのスコーピング機能だけを用いた。
`TailwindCSS`に代表されるユーティリティファーストのCSSフレームワークについては、
そのフレームワークに成熟していなければ読みにくいこと、
デザインシステムが効力を発揮するほどの規模ではないこと、
複雑なセレクタやアニメーションは結局CSSを直接書くしかないことから採用を見送った。

`Bootstrap`などのフレームワークについても、デザインから一新するために使用しなかった。

ただしCSS変数は使用している。

### インフラ構成

2024年3月時点でのWebサーバーインフラには以下の問題がある

- `Apache httpd`との密結合
  - `.htaccess`が大量に用いられている
  - これによりWebサーバの載せ替えが非常に面倒となっている。設定ファイルも複雑化する
- 単一のWebサーバで全てを行なっている
  - PHPの脆弱性を突かれると巨大な権限が奪われる
  - 部分的なアップデートが困難
  - 責務が分離されておらず、見通しが悪い
- メンテナンスされていないPHPサービス
  - 脆弱性の温床

以上の問題を解決するため、将来的にはReverse Proxy + Dockerコンテナの構成に持っていきたい。
Reverse Proxyは見やすいUIとDockerなどのランタイムとの統合を備えた`traefik`を第一候補とし、
PHPサービスは廃止ないしコンテナ単位での分離を目標としていく。
また、`.htaccess`への依存をやめて何らかの統一認証基盤を採用することでセキュリティの強化も図る。

全体の更新をいきなり行うのは困難であるため、
まず第一段階として`traefik`の導入と本ページの`nginx`でのサーブだけを最初に行う。

### 多言語対応

英語版ページの追加にあたって、以下を要件とした。

- 日本語と英語で編集対象のファイルが2つに分かれないこと
- 既存の日本語版のURLが変わらないこと
- テンプレートエンジン（Astro）とCIによる生成の枠組みを維持すること

一般的な構成は `src/pages/en/` に実ディレクトリを作ってページを複製するものだが、
これは1つ目の要件と真っ向から対立する。
また、コンテンツを `content/news/ja/` と `content/news/en/` に分ける方式も広く使われているが、
翻訳者と執筆者が同一で言語が日英2つに固定されているこの研究室の運用では、
ファイルが分かれることによる同期ズレ（日本語だけ直して英語が古いまま、に気付けない）の方が問題になる。

そこで以下の構成を採った。

- **ルーティング**: `src/pages/[...lang]/` の rest パラメータで、
  1つのページファイルから `/`（日本語）と `/en/`（英語）の両方を生成する。
  `getStaticPaths` が `{ lang: undefined }` と `{ lang: "en" }` を返すことで、
  デフォルト言語には接頭辞が付かず既存URLがそのまま維持される。
- **本文**: `<Lang>` の名前付きスロットで日英を同一ファイル内に併記する。
  スロットなのでコンポーネントを含むリッチな本文もそのまま書け、MDXの本文中でも使える。
- **短いUI文字列**: `src/i18n/ui.ts` の辞書と `useTranslations(lang)`。
  これはAstro公式のi18nレシピと同じ構成である。
- **コンテンツ**: スキーマに `_en` サフィックスの任意フィールドを持たせ、未翻訳なら日本語にフォールバックする。

言語コードはBCP 47（ISO 639-1）の2文字コード `en` を用いる。
`<html lang>` と `<link rel="alternate" hreflang>` はこれに従う必要があり、
`eng` のような3文字コード（ISO 639-2）はWebでは使われない。

なお、この構成は3言語目を追加する場合には向いていない
（1ファイルに3言語が並ぶことになり、`<Lang>` のスロットも増える）。
その場合はロケールごとにコンテンツファイルを分ける一般的な方式への移行を検討すること。
`Lang` と `localized()` を経由しているので、切り替え箇所は機械的に洗い出せる。
