<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';

	const images = [
		{
			name: 'COMA',
			path: 'COMA.jpg'
		},
		{
			name: 'HA-PACS',
			path: 'HA-PACS.jpg'
		},
		{
			name: 'Cygnus',
			path: 'Cygnus.png'
		},
		{
			name: 'HA-PACS / TCA',
			path: 'HA-PACS-TCA.jpg'
		},
		{
			name: 'Oakforest-PACS',
			path: 'OFP.jpg'
		}
	];
</script>

<PageHead title={'HPCS Lab.'} description={'HPCS Lab. Webページ'} />
<Header />
<div class="slider">
	<img src="/Cygnus.png" width="100%" alt="Cygnus" />
	<div class="caption-wrap">
		<div class="caption">Cygnus</div>
	</div>
</div>

<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">Welcome to HPCS laboratory</h1>
		</div>
	</header>
	<div class="container sidebar">
		<div id="primary" class="content-area">
			<main class="site-main entry-content">
				<h2><a href="/bachelor/#!index.md">卒研配属情報はこちらから</a></h2>
				<h2>High Performance Computing System labs.</h2>
				<p>
					筑波大学ハイパフォーマンス・コンピューティング・システム研究室では，超並列計算機からクラスタまで，高性能計算に関連した以下の研究を行っています．
				</p>
				<ol>
					<li>各種並列処理システムにおける高性能計算と性能評価</li>
					<li>プロセッサからネットワークまで計算機アーキテクチャに関する研究</li>
					<li>GPUやメニーコア，FPGAなどの高性能計算向けアーキテクチャの研究</li>
					<li>高性能並列処理コンパイラの研究</li>
					<li>大規模データ処理 (ビッグデータ) 技術の研究</li>
					<li>大規模計算機を支えるストレージ技術やシステムソフトウェアに関する研究</li>
					<li>大規模計算機における高性能数値計算技術の研究</li>
				</ol>
                <p>特に，筑波大学計算科学研究センターで運用されている多重複合型演算加速スーパーコンピュータCygnus, 最先端共同HPC基盤施設（JCAHPC）のOakforest-PACSでは，これらの大規模並列計算機を用いて各種計算科学応用分野と積極的な関係・共同研究を行っており，並列言語・ライブラリ・アルゴリズム等、様々な面で実世界に役立つ高性能計算を目指した研究を進めています．</p>
			</main>
		</div>
        <div id="secondary" class="widget-area">
            <aside id="nav_menu-2" class="widget widget_nav_menu"><h3 class="widget-title">Link</h3><div class="menu-link-container"><ul id="menu-link" class="menu"><li id="menu-item-165" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-165"><a target="_blank" href="http://www.tsukuba.ac.jp/">筑波大学</a></li>
                <li id="menu-item-166" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-166"><a target="_blank" href="http://www.sie.tsukuba.ac.jp/">システム情報工学研究科</a></li>
                <li id="menu-item-168" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-168"><a target="_blank" href="http://www.cs.tsukuba.ac.jp/">コンピュータサイエンス専攻</a></li>
                <li id="menu-item-169" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-169"><a target="_blank" href="https://www.coins.tsukuba.ac.jp/">情報科学類</a></li>
                <li id="menu-item-171" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-171"><a target="_blank" href="http://www.ccs.tsukuba.ac.jp/">計算科学研究センター</a></li>
                <li id="menu-item-728" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-728"><a target="_blank" href="/bachelor/#!index.md">卒研配属情報</a></li>
                <li id="menu-item-749" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-749"><a target="_blank" href="/experiment/text.html">情報システム実験B</a></li>
                <li id="menu-item-172" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-172"><a target="_blank" href="/internal/pukiwiki/">Internal Page</a></li>
                <li id="menu-item-1100" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1100"><a href="/bachelor/"><img src="/banner_bachelor2.png"></a></li>
                </ul></div></aside>
        </div>
	</div>
</div>

<style>
	.slider {
		width: 100%;
		position: relative;
	}
	.caption-wrap {
		position: absolute;
		bottom: 0;
		left: 0;
		opacity: 0.7;
		margin: 0;
		display: block;
		width: 100%;
		line-height: 1.4em;
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
		font-size: 2rem;
		line-height: normal;
		text-align: center;
	}
	.caption {
		padding: 8px 14px 9px;
	}
</style>
