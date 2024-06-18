<script lang="ts">
	import * as env from '$env/static/public';
	import searchIcon from '$lib/images/icons/search.svg';
	import type { SearchResult } from '$lib/types';

	let query: string;
	let results: SearchResult[] = [];
	let timer: number;

	const search = async () => {
		if (query.length >= 2) {
			const response = await fetch(`${env.PUBLIC_API_URL}/search?query=${query}`);
			results = await response.json();
		} else {
			results = [];
		}
	};

	const handleKeyUp = async () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			search();
		}, 500);
	};

	const clear = () => {
		setTimeout(() => {
			query = '';
			results = [];
		}, 100);
	};
</script>

<div class="search w-full">
	<input
		class="w-full"
		name="q"
		placeholder="arat bakalım..."
		autocomplete="off"
		bind:value={query}
		on:input={handleKeyUp}
	/>
	<a href="/baslik/{query}" class="go row center-items" on:click={clear}>
		<img class="center-items" src={searchIcon} alt="Search" />
	</a>
	<div class="results col" class:hidden={results.length === 0}>
		{#if results.length > 0}
			{#each results as result}
				<a class="result" href="/baslik/{result.name}" on:click={clear}>{result.name}</a>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.search {
		max-width: 30rem;
		display: flex;
		gap: 0.5rem;
	}

	.go {
		padding: 0 1rem;
		height: calc(2rem - 2px);
		border: 1px solid $light-grey;
		border-radius: 0.25rem;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		max-width: 1rem;
		max-height: 1rem;
	}

	.results {
		position: absolute;
		top: 90%;
		background-color: $dark-purple-100;
		border: 1px solid $light-grey;
		border-radius: 0.25rem;
		@media (min-width: 1440px) {
			width: 30rem;
		}
		@media (max-width: 1440px) {
			right: 20%;
			left: 20%;
		}
		@media (max-width: 768px) {
			right: 1rem;
			left: 1rem;
		}
	}

	.result {
		padding: 0.5rem;
		color: $light-grey;
		font-size: 0.875rem;
	}

	.hidden {
		display: none;
	}
</style>
