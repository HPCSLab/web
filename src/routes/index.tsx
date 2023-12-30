import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import NewsHeadline from "~/components/news/news-headline";
import Section from "~/components/section-in-index/section";
import { news } from "~/resource";
import { css } from "~/styled-system/css";

export const useLatestNews = routeLoader$(async () => {
  return (await news({})).slice(0, 10);
});

export default component$(() => {
  const latestNews = useLatestNews();
  return (
    <>
      <main>
        <h1 class={css({ fontSize: "2xl", fontWeight: "bold" })}>
          Welcome to HPCS Lab.
        </h1>
        <Section
          title="卒研配属情報はこちらから"
          url="https://www.hpcs.cs.tsukuba.ac.jp/bachelor/#!index.md"
        ></Section>
        <Section title="High Performance Computing System labs.">
          <p>
            筑波大学ハイパフォーマンス・コンピューティング・システム研究室では，
            超並列計算機からクラスタまで，高性能計算に関連した以下の研究を行っています．
          </p>
          <ul class={css({ listStyle: "disc", pl: 6 })}>
            <li>各種並列処理システムにおける高性能計算と性能評価</li>
            <li>
              プロセッサからネットワークまで計算機アーキテクチャに関する研究
            </li>
            <li>
              GPUやメニーコア，FPGAなどの高性能計算向けアーキテクチャの研究
            </li>
            <li>高性能並列処理コンパイラの研究</li>
            <li>大規模データ処理 (ビッグデータ) 技術の研究</li>
            <li>
              大規模計算機を支えるストレージ技術やシステムソフトウェアに関する研究
            </li>
            <li>大規模計算機における高性能数値計算技術の研究</li>
          </ul>
          <p>
            特に，筑波大学計算科学研究センターで運用されている多重複合型演算加速スーパーコンピュータCygnus,
            最先端共同HPC基盤施設（JCAHPC）のOakforest-PACSでは，
            これらの大規模並列計算機を用いて各種計算科学応用分野と積極的な関係・共同研究を行っており，
            並列言語・ライブラリ・アルゴリズム等、様々な面で実世界に役立つ高性能計算を目指した研究を進めています．
          </p>
        </Section>
        <Section title="What's news">
          <NewsHeadline news={latestNews.value} />
        </Section>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "HPCS Lab.",
  meta: [
    {
      name: "description",
      content: "HPCS Laboratory, Tsukuba University",
    },
  ],
};
