<script lang="ts">
	export let title: string;
	export let description: string;

	const siteTitle = 'HPCS Lab. – 筑波大学システム情報工学研究科　ハイパフォーマンス・コンピューティング・システム研究室';
	const formattedTitle = title ? `${title} | HPCS Lab.` : siteTitle;
</script>

<svelte:head>
	<title>{formattedTitle}</title>
	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>
