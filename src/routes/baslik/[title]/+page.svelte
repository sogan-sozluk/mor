<script lang="ts">
	import EntryItem from '$lib/components/EntryItem.svelte';
	import NewEntry from '$lib/components/NewEntry.svelte';
	import Pager from '$lib/components/Pager.svelte';
	import type { TitleData } from './+page';

	export let data: TitleData;
</script>

<div class="w-full col gap-1">
	<a class="title" href="/baslik/{data.title}">{data.title}</a>
	{#if data.error}
		<h1>{data.error.error}</h1>
		<p>{data.error.details}</p>
	{:else if data.entries.items.length === 0}
		<p class="text-sm text-gray-500">Henüz hiçbir girdi yok.</p>
	{:else}
		<div class="pager-wrapper">
			<Pager
				totalPage={Math.ceil(data.entries.total / data.entries.perPage)}
				currentPage={data.entries.page}
			/>
		</div>
		{#each data.entries.items as entry}
			<EntryItem {entry} showTitle={false} />
		{/each}
	{/if}
	<NewEntry title={data.title} />
</div>

<style lang="scss">
	.pager-wrapper {
		display: flex;
		max-width: 45rem;
		justify-content: flex-end;
	}
	.title {
		margin: 0;
		color: $light-grey;
		font-size: 1.375rem;
		font-weight: 800;
	}
</style>
