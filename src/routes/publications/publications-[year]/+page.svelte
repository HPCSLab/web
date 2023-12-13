<script lang="ts">
	import type { PageData } from './$types';

	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: PageData;
    $: year = data.year;
    $: old_content = data.old_content;
    $: bibtex_lists = data.bibtex_lists;
</script>

<PageHead title={'HPCS Lab.'} description={'HPCS Lab. Webページ'} />
<Header />
<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">Publications ({year})</h1>
		</div>
	</header>
    <div class="container">
        <div class="content-area">
            <main class="site-main entry-content">
                {#if year < 2015}
                    <svelte:component this={old_content.default} />
                {:else}
                    <h1>論文誌</h1>
                    <ol>
				    {#each bibtex_lists.journal as item}
					    <li>
                            <p>{item.metadata.ref} <a href="/wp-publications/{item.metadata.slug}">[bibtex]</a></p>  
					    </li>
				    {/each}
                    </ol>
                    <h1>国際発表</h1>
                    <h2>国際会議</h2>
                    <ol>
                    {#each bibtex_lists.conference as item}
					    <li>
                            <p>{item.metadata.ref} <a href="/wp-publications/{item.metadata.slug}">[bibtex]</a></p>  
					    </li>
                    {/each}
                    </ol>
                    <h2>ポスター発表</h2>
                    <ol>
                    {#each bibtex_lists.poster as item}
					    <li>
                            <p>{item.metadata.ref} <a href="/wp-publications/{item.metadata.slug}">[bibtex]</a></p>  
					    </li>
                    {/each}
                    </ol>
                    <h1>国内発表</h1>
                    <h2>シンポジウム</h2>
                    <ol>
                    {#each bibtex_lists.domestic_symposium as item}
					    <li>
                            <p>{item.metadata.ref} <a href="/wp-publications/{item.metadata.slug}">[bibtex]</a></p>  
					    </li>
                    {/each}
                    </ol>
                    <h2>ポスター発表</h2>
                    <ol>
                    {#each bibtex_lists.domestic_poster as item}
					    <li>
                            <p>{item.metadata.ref} <a href="/wp-publications/{item.metadata.slug}">[bibtex]</a></p>  
					    </li>
                    {/each}
                    </ol>
                    <h2>研究会・その他</h2>
                    <ol>
                    {#each bibtex_lists.techreport as item}
					    <li>
                            <p>{item.metadata.ref} <a href="/wp-publications/{item.metadata.slug}">[bibtex]</a></p>  
					    </li>
                    {/each}
                    </ol>
                {/if}
            </main>
        </div>
    </div>
</div>


<Footer />