<script lang="ts">
	import type { FeedData } from './+page';
	import EntryItem from '$lib/components/EntryItem.svelte';

	export let data: FeedData;
</script>

<div class="feed w-full col">
	{#if data.entries.length === 0}
		<p class="text-sm text-gray-500">Henüz hiçbir girdi yok.</p>
	{/if}
	{#each data.entries as entry}
		<EntryItem {entry} />
	{/each}
</div>

<style lang="scss">
	.feed {
		gap: 1.5rem;
	}
</style>
