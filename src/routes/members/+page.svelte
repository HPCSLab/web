<script lang="ts">
	import type { PageData } from './$types';

	import Header from '$lib/components/Header.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Filter from '$lib/components/Filter.svelte';

	let filter_job: string;

	const job_options = [
		{
			value: 'all',
			label: 'All',
		},
		{
			value: 'Faculty',
			label: '教員',
		},
		{
			value: 'Researcher',
			label: '研究員',
		},
		{
			value: 'Student',
			label: '学生',
		},
		{
			value: 'Research Student',
			label: '研究生',
		},
	];

	let filter_team: string;

	const team_options = [
		{
			value: 'all',
			label: 'All',
		},
		{
			value: 'Algorithm',
			label: 'Algorithm',
		},
		{
			value: 'System Software',
			label: 'System Software',
		},
		{
			value: 'FPGA',
			label: 'FPGA',
		},
		{
			value: 'Architecture',
			label: 'Architecture',
		},
		{
			value: 'PA',
			label: 'PA',
		},
		{
			value: 'Performance',
			label: 'Performance',
		},
	];

	export let data: PageData;
	$: profiles = data.profiles.filter((prof) => {
		if (filter_job != 'all') {
			if (prof.occupation != filter_job) {
				return false;
			}
		}
		if (filter_team != 'all') {
			if (prof.team != filter_team) {
				return false;
			}
		}
		return true;
	});
</script>

<PageHead title={'Members'} description={'Members page'} />
<Header />
<div class="site-content">
	<header class="entry-header">
		<div class="container">
			<h1 class="entry-title">Members</h1>
		</div>
	</header>

	<div class="container">
		<div id="primary" class="content-area">
			<main class="site-main entry-content">
				<Filter title="Filter job" options={job_options} bind:userSelected={filter_job} />
				<Filter title="Filter team" options={team_options} bind:userSelected={filter_team} />

				<div class="members">
					{#each profiles as prof}
						<div class="member_item">
							{#if prof.name === ''}
								<h4>{prof.eng_name}</h4>
							{:else}
								<h4>{prof.name} / {prof.eng_name}</h4>
							{/if}
							<div class="member_image">
								<a href="http://www.hpcs.cs.tsukuba.ac.jp/~{prof.username}/" target="_blank">
									<img src={prof.img} alt={prof.name} />
								</a>
							</div>
							<div class="member_info">
								<ul>
									{#if prof.occupation === 'Student'}
										<li>学生 ({prof.grade}) / Student ({prof.grade})</li>
									{:else if prof.occupation === 'Faculty'}
										{#if prof.grade === 'Professor'}
											<li>教員 (教授) / Faculty (Professor)</li>
										{:else if prof.grade === 'Associate Professor'}
											<li>教員 (准教授) / Faculty (Associate Professor)</li>
										{:else if prof.grade === 'Assistant Professor'}
											<li>教員 (助教) / Faculty (Assistant Professor)</li>
										{:else if prof.grade === 'Professor (Cooperative Graduate School Program)'}
											<li>
												教員 (教授 (連携大学院)) / Faculty (Professor (Cooperative Graduate School
												Program))
											</li>
										{/if}
									{:else if prof.occupation === 'Researcher'}
										<li>研究員 / Researcher</li>
									{:else if prof.occupation === 'Research Student'}
										<li>研究生 / Research Student</li>
									{/if}
									<li>{prof.team} Team</li>
								</ul>
							</div>
							<div class="member_link">
								<a
									href="http://www.hpcs.cs.tsukuba.ac.jp/~${prof.username}/"
									target="_blank"
									title="個人ページ"
								>
									<img src="/external.png" alt="external" />
								</a>
								<a class="mailaddr" href="mailto:{prof.username}@hpcs.cs.tsukuba.ac.jp">
									<img src="/mail.png" alt="mail" />
								</a>
							</div>
						</div>
					{/each}
				</div>
			</main>
		</div>
	</div>
</div>

<Footer />

<style>
	.members {
		display: flex;
		flex-wrap: wrap;
	}
	.member_item {
		display: block;
		width: 350px;
		margin: 8px;
		padding: 20px 10px;
		background-color: #eee;
		position: relative;
		-webkit-box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
		-moz-box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
		box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
	}

	.member_item:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		border-bottom: 25px solid #ddd;
		border-left: 25px solid transparent;
		-webkit-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
		-moz-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
		box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
	}

	.member_item:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		border-top: 25px solid #fff;
		border-right: 25px solid transparent;
	}

	.member_item > h4 {
		margin: 0 0 5px 0;
		text-align: center;
	}

	.member_info {
		float: left;
		width: 190px;
	}

	.member_info > ul {
		margin: 0 0 0 20px;
		list-style: none;
	}

	.member_info > ul > li {
		position: relative;
	}

	.member_info > ul > li:before {
		position: absolute;
		content: '';
		top: 0.3em;
		left: -1em;
		width: 6px;
		height: 12px;
		border-right: 2px solid #666;
		border-bottom: 2px solid #666;
		-moz-transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.member_image {
		float: left;
		width: 120px;
		height: 120px;
		margin: 0 5px 0 15px;
	}

	.member_image > a > img {
		display: block;
		margin: auto;
		border-radius: 12px;
		-moz-border-radius: 12px;
		-webkit-border-radius: 12px;
	}

	.member_link {
		position: absolute;
		bottom: 15px;
		right: 10px;
	}

	.member_link > a > img {
		width: 16px;
		height: 16px;
		margin-right: 5px;
	}

	#button_team {
		display: none;
	}

	#button_student_year {
		display: none;
	}
</style>
