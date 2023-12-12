<script lang="ts">
	import type { PageData } from './$types';
	import type { SvelteComponentTyped } from 'svelte/internal';

	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: PageData;

	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.component as unknown as C;
</script>

<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />
<Header />
<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">{data.frontmatter.title}</h1>
		</div>
	</header>
    <div class="container">
        <div id="primary" class="content-area">
            <main class="site-main entry-content">
                <svelte:component this={component} />
            </main>
        </div>
    </div>
</div>
<Footer />