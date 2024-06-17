<script lang="ts">
	import EntryItem from '$lib/components/EntryItem.svelte';
	import NewEntry from '$lib/components/NewEntry.svelte';
	import type { TitleData } from './+page';

	export let data: TitleData;
</script>

<div class="w-full col gap-1">
	<a class="title" href="/baslik/{data.title}">{data.title}</a>
	{#if data.entries.length === 0}
		<p class="text-sm text-gray-500">Henüz hiçbir girdi yok.</p>
	{/if}
	{#each data.entries as entry}
		<EntryItem {entry} showTitle={false} />
	{/each}
	<NewEntry title={data.title} />
</div>

<style lang="scss">
	.title {
		margin: 0;
		color: $light-grey;
		font-size: 1.375rem;
		font-weight: 800;
	}
</style>
