<script lang="ts">
	import { navigating } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
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
	<title>soğan sözlük - özgürce yaz, özgürce oku</title>
	<meta name="description" content="Özgürce yaz, özgürce oku." />
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
	<Footer />
</div>

<style lang="scss">
	.app {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		align-items: center;
	}

	main {
		flex: 1 0 auto;
		width: calc(100% - 2rem);
		max-width: 90rem;
		margin: 1rem;
	}

	@media (max-width: 670px) {
		main {
			flex-direction: column;
		}
	}
</style>
