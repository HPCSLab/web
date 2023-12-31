import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Researcher from "~/components/research/researcher";
import Team from "~/components/research/team";
import { css } from "~/styled-system/css";

export default component$(() => {
  return (
    <main>
      <h1 class={css({ fontSize: "2xl", m: "3" })}>Research</h1>
      <Team name="Algorithm Team">
        <Researcher
          name="高橋 大介 教授"
          url="http://www.hpcs.cs.tsukuba.ac.jp/~daisuke/"
        >
          <ul class={css({ listStyle: "disc", pl: "6" })}>
            <li>高性能数値計算に関する研究</li>
            <li>高性能並列数値計算ソフトウェア</li>
            <li>GPUやMIC（Many Integrated Core）などを用いた高性能計算</li>
            <li>高精度計算アルゴリズムとその応用</li>
          </ul>
          <p>
            我々は，限られた時間の中で大規模な科学技術計算を行うために，
            スーパーコンピュータの性能をできるだけ発揮できるようなアルゴリズムやプログラミングに関する研究を行っています．
            高速なプログラムを作成するには，コンピュータの仕組みや数学について深い理解が必要になりますが、
            努力が性能という数字にそのまま反映されることから，やりがいがある分野です．
          </p>
        </Researcher>
        <Researcher
          name="多田野 寛人 助教"
          url="http://www.hpcs.cs.tsukuba.ac.jp/~tadano/"
        >
          <ul class={css({ listStyle: "disc", pl: "6" })}>
            <li>大規模線形計算アルゴリズムに関する研究</li>
            <li>
              大規模連立一次方程式の高速・高精度・高信頼性アルゴリズムの構築
            </li>
            <li>連立一次方程式の 高速化のための前処理法の開発</li>
            <li>並列計算環境における大規模固有値問題の高速解法の開発</li>
          </ul>
        </Researcher>
      </Team>
      <Team name="System Software Team">
        <Researcher
          name="建部 修見 教授"
          url="http://www.hpcs.cs.tsukuba.ac.jp/~tatebe/"
        >
          <p>
            <strong>
              HPC・ビッグデータ・AIのための並列分散システムソフトウェアに関する研究
            </strong>
          </p>
          <p>
            超大規模ビッグデータ解析，データインテンシブコンピューティング，ハイパフォーマンスコンピューティングのためのシステムソフトウェアの研究を行っています．
            より大規模なデータ解析のためには，データ規模，コンピュータの計算速度に応じたスケーラブルなI/Oの仕組みが必要になります．
            その仕組みに基づく分散ファイルシステム，並列I/O，ワークフロー，MapReduceなどスケールアウトする並列分散システムソフトウェアの研究を行っています．
            そのためのプラットフォームとしてオープンソースで
            <Link
              class={css({ textDecoration: "underline", color: "blue.700" })}
              href="http://oss-tsukuba.org/software/gfarm"
            >
              Gfarmファイルシステム
            </Link>
            を開発しています．
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/XvcKs-c9nA8"
            title="FY2011-2016 JST CREST System Software for Post Petascale Data Intensive Science"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <p>
            下記の動画は，アメリカで開催された国際会議 SuperComputing (SC16)
            でのDDNのブースにおいて，Oakforest-PACSで用いているストレージシステムについての発表の様子です．
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/j8bSCltqUWw"
            title=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <p>
            詳細は
            <Link
              class={css({ textDecoration: "underline", color: "blue.700" })}
              href="http://www.ddn.com/customers/joint-center-for-advanced-high-performance-computing-jcahpc/"
            >
              こちら
            </Link>
            を参照してください．
          </p>
        </Researcher>
      </Team>
      <Team name="FPGA Team">
        <Researcher
          name="山口 佳樹 准教授"
          url="https://www.cs.tsukuba.ac.jp/~yoshiki/"
        >
          <ul class={css({ listStyle: "disc", pl: "6" })}>
            <li>FPGAやGPUなどによるアクセラレータに関する研究</li>
            <li>
              画像・音声処理，ビッグデータ解析，人工知能，暗号処理などにおけるハードウェア化研究，など
            </li>
          </ul>
          <p>
            FPGA市場は急速に成長しており，2020年には2010年の約2倍となる1兆円に達すると言われています．
            国内ゲーム市場（約5,000億円）やオンラインゲーム市場（約2,000億円）等と比べるとこの数字の大きさがわかると思います．
            加えて，自動運転，医療/福祉，ロボット，ビッグデータ，安全・安心，航空宇宙等の分野で利活用されるため，
            FPGAは市場規模以上の付加価値を持っています．そこで我々は，現在要求されていること（画像/音声検出・認識・追尾・圧縮のハード化，
            ビッグデータ高速処理，大規模科学技術計算（宇宙・海洋・風洞），暗号処理等）に関する基礎・応用研究を行っています．また，FPGAの特徴を理解し，
            FPGAが苦手とする計算をGPUやCPU等で行う混成システム（ヘテロジニアスなシステム）についても研究しています．加えて，理化学研究所（大規模計算分野），
            産業技術総合研究所（人工知能分野）等の国内研究機関を初め，海外研究機関（イギリス、ドイツ、ノルウェー等）とも提携をしています．
          </p>
        </Researcher>
      </Team>
      <Team name="Architecture Team">
        <Researcher
          name="朴 泰祐 教授"
          url="http://www.hpcs.cs.tsukuba.ac.jp/~taisuke/"
        >
          <ul class={css({ listStyle: "disc", pl: 6 })}>
            <li>
              GPU等の演算加速装置を含む並列処理アーキテクチャ及びネットワークに関する研究
            </li>
            <li>
              これらのシステムを効率的に利用するための並列処理言語及びコンパイラに関する研究
            </li>
            <li>
              実応用プログラム開発者との共同研究による超並列アプリケーションの性能向上に関する研究，など
            </li>
          </ul>
          <p>
            GPUやメニーコアプロセッサ等の演算加速装置をより有効に大規模並列処理に活用する手法や超高性能並列処理向けネットワーク，
            さらにこれらを活用する高性能並列コンパイラの研究をしています．我々が提案しているTCA
            (Tightly Coupled Accelerators)
            というコンセプトでは，演算加速装置間を従来技術より高速に接続し、効率的な並列処理を行う基盤技術開発を行っています．
            また，本学計算科学研究センターの研究者との実用的大規模アプリケーション，さらに連携大学院の佐藤三久教授との共同研究の下，
            理化学研究所で進められている次世代超並列計算機（ポスト「京」）プロジェクトとの共同研究も行い，ネットワークシミュレーション，
            独自開発の並列処理言語・コンパイラ等の研究を進めています．
          </p>
        </Researcher>
        <Researcher
          name="小林 諒平 助教"
          url="https://sites.google.com/site/ryokbya/"
        >
          <p>
            <strong>
              高性能なFPGAアクセラレータとその開発方式に関する研究
            </strong>
          </p>
          <p>
            大規模なデータ処理や科学技術計算を高速，かつ低消費電力に実行できるようにするために，
            電子回路のパターンをプログラムできるハードウェアであるFPGAを応用した計算機システムについて研究しています．
            具体的にはCPUやGPUをより効率的・大規模に利用するための，FPGA向けのハードウェアアルゴリズムやFPGAベースの専用アクセラレータの提案，
            実装を行っていきます．また，高性能なFPGAアクセラレータの効率的な開発を睨んだプラットフォームについても同時に研究しています．
          </p>
        </Researcher>
      </Team>
      <Team name="PA Team">
        <Researcher
          name="佐藤 三久 連携大学院教授 (理化学研究所 計算科学研究センター)"
          url="http://www.hpcs.cs.tsukuba.ac.jp/~msato/"
        >
          <strong>
            大規模並列システムとGPU，メニーコアのためのプログラミング言語，モデルに関する研究
          </strong>
          <p>
            筑波大学計算科学研究センターでは，東京大学と共に，2016年に大規模なメニーコアプロセッサを用いたスーパコンピュータを構築する予定です
            (
            <Link
              class={css({ textDecoration: "underline", color: "blue.700" })}
              href="https://www.jcahpc.jp"
            >
              JCAHPC
            </Link>
            )．このシステムで活用できるプログラミングシステムや，理化学研究所計算科学研究機構のチームとともに並列プログラミング言語XcalableMPという言語を開発しています．
          </p>
        </Researcher>
      </Team>
    </main>
  );
});
