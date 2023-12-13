<script lang="ts">
	import type { PageData } from './$types';

	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: PageData;
	$: news = data.news;
</script>

<PageHead title={'HPCS Lab.'} description={'HPCS Lab. Webページ'} />
<Header />
<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">News</h1>
		</div>
	</header>

	<div class="container">
		<div class="content-area">
			<main class="site-main entry-content">
                <ul>
                {#each news as news_item}
                    <li>
                        <p>{news_item.date} <a href={news_item.path}>{news_item.title}</a></p>
                    </li>
                {/each}
                </ul>
            </main>
		</div>
	</div>
</div>
<Footer />
