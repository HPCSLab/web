<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<PageHead title={'Access'} description={'Access page'} />
<Header />
<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">Access</h1>
		</div>
	</header>
	<div class="container">
		<div id="primary" class="content-area">
			<main class="site-main entry-content">
				<div class="entry-content">
					<h2>Address</h2>
					<p>
						HPCS Lab. University of Tsukuba<br />
						1-1-1 Tennodai, Tsukuba, 305-8573 Ibaraki, Japan
					</p>
					<p>
						305-8573<br />
						茨城県 つくば市 天王台 1-1-1 筑波大学<br />
						システム情報工学研究科 HPCS研究室<br />
						総合研究棟B 928 (9F)<br />
						総合研究棟B 1122 (11F)<br />
						総合研究棟B 1124 (11F)
					</p>
					<p>
						<img
							class="alignnone size-full wp-image-22"
							src="/sb.jpg"
							alt="sb"
							width="240"
							height="180"
						/>
					</p>
					<h2>Phones</h2>
					<p>
						総合研究棟B 1122 (11F)<br />
						Telephone: +81.29.853.6912 (Ext. 6912)<br />
						Fax: +81.29.853.6912 (Ext. 6912)<br />
						電話: 029-853-6912 (内線:6912)<br />
						Fax: 029-853-6912 (内線:6912)
					</p>
					<p>
						総合研究棟B 1124 (11F)<br />
						Telephone: (Ext. 3655)<br />
						電話: (内線:3655)
					</p>
				</div>
			</main>
		</div>
	</div>
</div>

<Footer />
