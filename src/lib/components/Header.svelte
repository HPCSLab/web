<script>
	let toggled = false;
	function clickButton() {
		toggled = !toggled;
	}
</script>

<header class="site-header scale responsive-menu" role="banner">
	<div class="container">
		<div class="site-branding-container">
			<div class="site-branding">
				<a href="/" rel="home" target="_self">
					<h1 class="site-title">HPCS Lab.</h1>
				</a>
			</div>
		</div>
		<nav id="site-navigation" class="main-navigation {toggled ? 'toggled' : ''}" role="navigation">
			<button class="menu-toggle" aria-expanded={toggled ? "true" : "false"} on:click={clickButton}></button>
			<div class="menu-menu-container">
				<ul id="menu-menu" class="menu nav-menu" aria-expanded={toggled ? "true" : "false"}>
					<li
						id="menu-item-17"
						class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-15 current_page_item menu-item-17"
					>
						<a href="/" target="_self">Home</a>
					</li>
					<li
						id="menu-item-36"
						class="menu-item menu-item-type-post_type menu-item-object-page menu-item-36"
					>
						<a href="/research/" target="_self">Research</a>
					</li>
					<li
						id="menu-item-38"
						class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-38"
					>
						<a href="/members/" target="_self">Members</a>
						<ul class="sub-menu">
							<li
								id="menu-item-37"
								class="menu-item menu-item-type-post_type menu-item-object-page menu-item-37"
							>
								<a href="/members/alumni/" target="_self">Alumni</a>
							</li>
						</ul>
					</li>
					<li
						id="menu-item-113"
						class="menu-item menu-item-type-post_type menu-item-object-page menu-item-113"
					>
						<a href="/publications/" target="_self">Publications</a>
					</li>
					<li
						id="menu-item-730"
						class="menu-item menu-item-type-custom menu-item-object-custom menu-item-730"
					>
						<a target="_blank" href="https://www.hpcs.cs.tsukuba.ac.jp/bachelor/#!index.md"
							>Open Lab.</a
						>
					</li>
					<li
						id="menu-item-39"
						class="menu-item menu-item-type-post_type menu-item-object-page menu-item-39"
					>
						<a href="/access/" target="_self">Access</a>
					</li>
					<li
						id="menu-item-40"
						class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-40"
					>
						<a href="/#">Link</a>
						<ul class="sub-menu">
							<li
								id="menu-item-41"
								class="menu-item menu-item-type-custom menu-item-object-custom menu-item-41"
							>
								<a target="_blank" href="http://www.tsukuba.ac.jp/">筑波大学</a>
							</li>
							<li
								id="menu-item-42"
								class="menu-item menu-item-type-custom menu-item-object-custom menu-item-42"
							>
								<a target="_blank" href="http://www.sie.tsukuba.ac.jp/">システム情報工学研究科</a>
							</li>
							<li
								id="menu-item-43"
								class="menu-item menu-item-type-custom menu-item-object-custom menu-item-43"
							>
								<a target="_blank" href="http://www.cs.tsukuba.ac.jp/">コンピュータサイエンス専攻</a
								>
							</li>
							<li
								id="menu-item-44"
								class="menu-item menu-item-type-custom menu-item-object-custom menu-item-44"
							>
								<a target="_blank" href="https://www.coins.tsukuba.ac.jp/">情報科学類</a>
							</li>
							<li
								id="menu-item-45"
								class="menu-item menu-item-type-custom menu-item-object-custom menu-item-45"
							>
								<a target="_blank" href="http://www.ccs.tsukuba.ac.jp/">計算科学研究センター</a>
							</li>
							<li
								id="menu-item-732"
								class="menu-item menu-item-type-custom menu-item-object-custom menu-item-732"
							>
								<a target="_blank" href="https://www.hpcs.cs.tsukuba.ac.jp/bachelor/#!index.md"
									>卒研配属情報</a
								>
							</li>
							<li
								id="menu-item-748"
								class="menu-item menu-item-type-custom menu-item-object-custom menu-item-748"
							>
								<a href="https://www.hpcs.cs.tsukuba.ac.jp/experiment/text.html"
									>情報システム実験B</a
								>
							</li>
							<li
								id="menu-item-46"
								class="menu-item menu-item-type-custom menu-item-object-custom menu-item-46"
							>
								<a target="_blank" href="https://www.hpcs.cs.tsukuba.ac.jp/internal/pukiwiki/"
									>Internal Page</a
								>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</header>

<style>
	.menu-item-has-children:hover ul {
		display: block;
	}
</style>
