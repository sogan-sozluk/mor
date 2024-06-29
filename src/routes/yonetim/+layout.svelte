<script lang="ts">
	import '../../styles.scss';
	import { navigating } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import ModerationMenu from '$lib/components/ModerationMenu.svelte';
	import type { ModeratorMenuData } from './+layout';

	export let data: ModeratorMenuData;
</script>

<svelte:head>
	<title>soğan sözlük - özgürce yaz, özgürce oku</title>
	<meta name="description" content="Özgürce yaz, özgürce oku." />
</svelte:head>

<div class="app">
	<Header />
	<main class="row gap-1">
		{#if data.error}
			<p>{data.error.error}</p>
			<p>{data.error.details}</p>
		{:else if data.statistics}
			<ModerationMenu statistics={data.statistics} />
		{/if}
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
