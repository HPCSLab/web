<script lang="ts">
	export let images: { uri: string; name: string }[];
</script>

<div class="carousel-container">
	<style>
	@keyframes anim {
		0% {
			opacity: 0;
			animation-timing-function: ease-in;
		}
		8% {
			opacity: 1;
			animation-timing-function: ease-out;
		}
		17% {
			opacity: 1;
		}
		25% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	</style>
	{#each images as image, index}
		<div
			class="carousel-item"
			style="animation: anim {6 * images.length}s linear infinite 0s; animation-delay: {6 *
				index}s;"
		>
			<img src={image.uri} alt={image.name} />
			<div class="caption-wrap">
				<div class="caption">{image.name}</div>
			</div>
		</div>
	{/each}
</div>

<style global>
	.carousel-container {
		width: 100%;
		height: 300px;
		position: relative;
		overflow: hidden;
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

	.carousel-item {
		opacity: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		opacity: 0;
		z-index: 0;
	}

	.carousel-item > img {
		width: 100%;
	}

</style>
