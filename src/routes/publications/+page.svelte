<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<PageHead title={"Publications"} description={"Publications page"} />
<Header />
<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">Publications</h1>
		</div>
	</header>
    <div class="container">
        <div id="primary" class="content-area">
            <main class="site-main entry-content">
                <ul>
					<li><a href="/publications/publications-2015">Publications (2015)</a></li>
					<li><a href="/publications/publications-2001">Publications (2001)</a></li>
				</ul>
            </main>
        </div>
    </div>
</div>
<Footer />
