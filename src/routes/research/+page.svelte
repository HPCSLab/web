<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<PageHead title={'Research'} description={'Research page'} />
<Header />
<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">Research</h1>
		</div>
	</header>
	<div class="container">
		<div class="content-area">
			<main class="site-main entry-content">
				<div class="entry-content">
					<div id="toc_container" class="no_bullets">
						<p class="toc_title">
							目次 <span class="toc_toggle"
								><span class="toc_brackets">[</span><a href="#">非表示</a><span class="toc_brackets"
									>]</span
								></span
							>
						</p>
						<ul class="toc_list">
							<li>
								<a href="#AlgorithmTeam"
									><span class="toc_number toc_depth_1">1</span> Algorithm&nbsp;Team</a
								>
								<ul>
									<li>
										<a href="#i"><span class="toc_number toc_depth_2">1.1</span> 高橋 大介 教授</a>
									</li>
									<li>
										<a href="#i-2"
											><span class="toc_number toc_depth_2">1.2</span> 多田野 寛人 助教</a
										>
									</li>
								</ul>
							</li>
							<li>
								<a href="#System_Software_Team"
									><span class="toc_number toc_depth_1">2</span> System Software Team</a
								>
								<ul>
									<li>
										<a href="#i-3"><span class="toc_number toc_depth_2">2.1</span> 建部 修見 教授</a
										>
									</li>
								</ul>
							</li>
							<li>
								<a href="#FPGA_Team"><span class="toc_number toc_depth_1">3</span> FPGA Team</a>
								<ul>
									<li>
										<a href="#i-4"
											><span class="toc_number toc_depth_2">3.1</span> 山口 佳樹 准教授</a
										>
									</li>
								</ul>
							</li>
							<li>
								<a href="#Architecture_Team"
									><span class="toc_number toc_depth_1">4</span> Architecture Team</a
								>
								<ul>
									<li>
										<a href="#i-5"><span class="toc_number toc_depth_2">4.1</span> 朴 泰祐 教授</a>
									</li>
									<li>
										<a href="#i-6"><span class="toc_number toc_depth_2">4.2</span> 小林 諒平 助教</a
										>
									</li>
								</ul>
							</li>
							<li>
								<a href="#PA_Team"><span class="toc_number toc_depth_1">5</span> PA Team</a>
								<ul>
									<li>
										<a href="#i-7"
											><span class="toc_number toc_depth_2">5.1</span> 佐藤 三久 連携大学院教授 (理化学研究所
											計算科学研究センター)</a
										>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<h1><span id="AlgorithmTeam">Algorithm&nbsp;Team</span></h1>
					<h2><span id="i">高橋 大介 教授</span></h2>
					<ol>
						<li><em><strong>高性能数値計算に関する研究</strong></em></li>
						<li><em><strong>高性能並列数値計算ソフトウェア</strong></em></li>
						<li>
							<em><strong>GPUやMIC（Many Integrated Core）などを用いた高性能計算</strong></em>
						</li>
						<li><em><strong>高精度計算アルゴリズムとその応用</strong></em></li>
					</ol>
					<p>
						我々は，限られた時間の中で大規模な科学技術計算を行うために，スーパーコンピュータの性能をできるだけ発揮できるようなアルゴリズムやプログラミングに関する研究を行っています．高速なプログラムを作成するには，コンピュータの仕組みや数学について深い理解が必要になりますが、努力が性能という数字にそのまま反映されることから，やりがいがある分野です．
					</p>
					<p>
						<a href="http://www.hpcs.cs.tsukuba.ac.jp/~daisuke/" target="_blank">教員個人ページ</a>
					</p>
					<h2><span id="i-2">多田野 寛人 助教</span></h2>
					<ol>
						<li><em><strong>大規模線形計算アルゴリズムに関する研究</strong></em></li>
						<li>
							<em
								><strong>大規模連立一次方程式の高速・高精度・高信頼性アルゴリズムの構築</strong></em
							>
						</li>
						<li><em><strong>連立一次方程式の 高速化のための前処理法の開発</strong></em></li>
						<li><em><strong>並列計算環境における大規模固有値問題の高速解法の開発</strong></em></li>
					</ol>
					<p>
						我々は，連立一次方程式や固有値問題をはじめとした数値解法アルゴリズムの開発を行っています．
					</p>
					<p>
						<a href="http://www.hpcs.cs.tsukuba.ac.jp/~tadano/" target="_blank">教員個人ページ</a>
					</p>
					<h1><span id="System_Software_Team">System Software Team</span></h1>
					<h2><span id="i-3">建部 修見 教授</span></h2>
					<p>
						<strong
							><em>HPC・ビッグデータ・AIのための並列分散システムソフトウェアに関する研究</em
							></strong
						><br />
						超大規模ビッグデータ解析，データインテンシブコンピューティング，ハイパフォーマンスコンピューティングのためのシステムソフトウェアの研究を行っています．より大規模なデータ解析のためには，データ規模，コンピュータの計算速度に応じたスケーラブルなI/Oの仕組みが必要になります．その仕組みに基づく分散ファイルシステム，並列I/O，ワークフロー，MapReduceなどスケールアウトする並列分散システムソフトウェアの研究を行っています．そのためのプラットフォームとしてオープンソースで<a
							href="http://oss-tsukuba.org/software/gfarm/"
							target="_blank">Gfarmファイルシステム</a
						>を開発しています．
					</p>
					<p>
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/XvcKs-c9nA8?rel=0"
							frameborder="0"
							allow="autoplay; encrypted-media"
							allowfullscreen=""
						></iframe>
					</p>
					<p>
						下記の動画は，アメリカで開催された国際会議 SuperComputing (SC16)
						でのDDNのブースにおいて，Oakforest-PACSで用いているストレージシステムについての発表の様子です．
					</p>
					<p>
						<iframe
							src="https://www.youtube.com/embed/j8bSCltqUWw"
							width="560"
							height="315"
							frameborder="0"
							allowfullscreen="allowfullscreen"
						></iframe><br />
						詳細は
						<a
							href="http://www.ddn.com/customers/joint-center-for-advanced-high-performance-computing-jcahpc/"
							target="_blank">こちら</a
						>　を参照してください．
					</p>
					<p>
						<a href="http://www.hpcs.cs.tsukuba.ac.jp/~tatebe/" target="_blank">教員個人ページ</a>
					</p>
					<h1><span id="FPGA_Team">FPGA Team</span></h1>
					<h2><span id="i-4">山口 佳樹 准教授</span></h2>
					<ol>
						<li><em><strong>FPGAやGPUなどによるアクセラレータに関する研究</strong></em></li>
						<li>
							<em
								><strong
									>画像・音声処理，ビッグデータ解析，人工知能，暗号処理などにおけるハードウェア化研究，など</strong
								></em
							>
						</li>
					</ol>
					<p>
						FPGA市場は急速に成長しており，2020年には2010年の約2倍となる1兆円に達すると言われています．国内ゲーム市場（約5,000億円）やオンラインゲーム市場（約2,000億円）等と比べるとこの数字の大きさがわかると思います．加えて，自動運転，医療/福祉，ロボット，ビッグデータ，安全・安心，航空宇宙等の分野で利活用されるため，FPGAは市場規模以上の付加価値を持っています．そこで我々は，現在要求されていること（画像/音声検出・認識・追尾・圧縮のハード化，ビッグデータ高速処理，大規模科学技術計算（宇宙・海洋・風洞），暗号処理等）に関する基礎・応用研究を行っています．また，FPGAの特徴を理解し，FPGAが苦手とする計算をGPUやCPU等で行う混成システム（ヘテロジニアスなシステム）についても研究しています．加えて，理化学研究所（大規模計算分野），産業技術総合研究所（人工知能分野）等の国内研究機関を初め，海外研究機関（イギリス、ドイツ、ノルウェー等）とも提携をしています．
					</p>
					<p><a href="http://www.cs.tsukuba.ac.jp/~yoshiki/" target="_blank">教員個人ページ</a></p>
					<h1><span id="Architecture_Team">Architecture Team</span></h1>
					<h2><span id="i-5">朴 泰祐 教授</span></h2>
					<ol>
						<li>
							<em
								><strong
									>GPU等の演算加速装置を含む並列処理アーキテクチャ及びネットワークに関する研究</strong
								></em
							>
						</li>
						<li>
							<em
								><strong
									>これらのシステムを効率的に利用するための並列処理言語及びコンパイラに関する研究</strong
								></em
							>
						</li>
						<li>
							<em
								><strong
									>実応用プログラム開発者との共同研究による超並列アプリケーションの性能向上に関する研究，など</strong
								></em
							>
						</li>
					</ol>
					<p>
						GPUやメニーコアプロセッサ等の演算加速装置をより有効に大規模並列処理に活用する手法や超高性能並列処理向けネットワーク，さらにこれらを活用する高性能並列コンパイラの研究をしています．我々が提案しているTCA
						(Tightly Coupled Accelerators)
						というコンセプトでは，演算加速装置間を従来技術より高速に接続し、効率的な並列処理を行う基盤技術開発を行っています．また，本学計算科学研究センターの研究者との実用的大規模アプリケーション，さらに連携大学院の佐藤三久教授との共同研究の下，理化学研究所で進められている次世代超並列計算機（ポスト「京」）プロジェクトとの共同研究も行い，ネットワークシミュレーション，独自開発の並列処理言語・コンパイラ等の研究を進めています．
					</p>
					<p>
						<a href="http://www.hpcs.cs.tsukuba.ac.jp/~taisuke/" target="_blank">教員個人ページ</a>
					</p>
					<h2><span id="i-6">小林 諒平 助教</span></h2>
					<p>
						<em><strong>高性能なFPGAアクセラレータとその開発方式に関する研究</strong></em><br />
						大規模なデータ処理や科学技術計算を高速，かつ低消費電力に実行できるようにするために，電子回路のパターンをプログラムできるハードウェアであるFPGAを応用した計算機システムについて研究しています．具体的にはCPUやGPUをより効率的・大規模に利用するための，FPGA向けのハードウェアアルゴリズムやFPGAベースの専用アクセラレータの提案，実装を行っていきます．また，高性能なFPGAアクセラレータの効率的な開発を睨んだプラットフォームについても同時に研究しています．
					</p>
					<p><a href="https://sites.google.com/site/ryokbya/" target="_blank">教員個人ページ</a></p>
					<h1><span id="PA_Team">PA Team</span></h1>
					<h2>
						<span id="i-7">佐藤 三久 連携大学院教授 (理化学研究所 計算科学研究センター)</span>
					</h2>
					<p>
						<em
							><strong
								>大規模並列システムとGPU，メニーコアのためのプログラミング言語，モデルに関する研究</strong
							></em
						><br />
						筑波大学計算科学研究センターでは，東京大学と共に，2016年に大規模なメニーコアプロセッサを用いたスーパコンピュータを構築する予定です
						(<a href="http://jcahpc.jp/" target="_blank">JCAHPC</a
						>)．このシステムで活用できるプログラミングシステムや，理化学研究所計算科学研究機構のチームとともに並列プログラミング言語XcalableMPという言語を開発しています．
					</p>
					<p>
						<a href="http://www.hpcs.cs.tsukuba.ac.jp/~msato/" target="_blank">教員個人ページ</a>
					</p>
				</div>
			</main>
		</div>
	</div>
</div>

<Footer />

<style>
	#toc_container {
		background: #f9f9f9;
		border: 1px solid #aaa;
		padding: 10px;
		margin-bottom: 1em;
		width: auto;
		display: table;
		font-size: 95%;
	}
</style>
