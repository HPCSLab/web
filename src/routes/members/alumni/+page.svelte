<script lang="ts">
	import type { PageData } from './$types';

	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	export let data: PageData;
	$: content = data.content;
</script>

<Header />
<PageHead title={"Members alumni"} description={"Members alumni page"} />
<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">Alumni</h1>
		</div>
	</header>
    <div class="container">
        <div id="primary" class="content-area">
            <main class="site-main entry-content">
				<svelte:component this={content.default} />
			</main>
		</div>
	</div>
</div>


<Footer />
