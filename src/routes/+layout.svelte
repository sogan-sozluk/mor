<script lang="ts">
	import { navigating } from '$app/stores';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import TitleExplorer from '$lib/components/TitleExplorer.svelte';
	import type { TitleExplorerItem } from '$lib/types';
	import Header from '../lib/components/Header.svelte';
	import '../styles.scss';
	import type { ExplorerData } from './+layout';

	export let data: ExplorerData;
	let todayTitles: TitleExplorerItem[] = data.todayTitles.items;
	let trendTitles: TitleExplorerItem[] = data.trendsTitles.items;
</script>

<svelte:head>
	<title>soğan sözlük</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="app">
	<Header />
	<main class="row gap-1">
		<TitleExplorer {todayTitles} {trendTitles} />
		{#if $navigating}
			<LoadingSpinner />
		{:else}
			<slot />
		{/if}
	</main>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	main {
		width: calc(100% - 2rem);
		max-width: 90rem;
		margin: 1rem 1rem 0 1rem;
	}

	@media (max-width: 670px) {
		main {
			flex-direction: column;
		}
	}
</style>
