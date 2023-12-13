<script lang="ts">
export let title: string;
export let options: {value: string, label: string}[];
export let userSelected = options[0].value;
</script>

 
<div class="radio_button">
	<label><span class="radio_header">{title}</span></label>
    {#each options as opt}
	<label>
		<input type="radio" bind:group={userSelected} value={opt.value}/>
		<span class="radio_label">{opt.label}</span>
	</label>
	{/each}
</div>

<style>
	.radio_button {
		margin: 5px;
		font-size: 0px;
		display: inline-block;
		-webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3);
		-moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3);
		box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3);
	}

	.radio_button > label {
		display: inline;
		font-size: 14px;
	}

	.radio_header {
		background: #8d4db8;
		color: #fff;
		padding: 8px;
		text-align: center;
		width: 100px;
		display: inline-block;
		font-size: 90%;
	}

	.radio_label {
		background: #e6e6e6;
		border: 3px #ccc;
		border-style: none none none solid;
		color: #666;
		cursor: pointer;
		padding: 8px;
		text-align: center;
		width: 120px;
		display: inline-block;
		font-size: 90%;
	}

	.radio_button input {
		display: none;
	}

	.radio_label:hover {
		background: #0cc4d1;
		color: #fff;
	}

	.radio_button input:checked + .radio_label {
		background: #0cc4d1;
		color: #fff;
	}
</style>