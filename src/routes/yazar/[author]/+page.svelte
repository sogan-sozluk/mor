<script lang="ts">
	import EntryItem from '$lib/components/EntryItem.svelte';
	import type { AuthorData } from './+page';

	export let data: AuthorData;
</script>

<div class="author w-full col">
	<a class="link" href="yazar/{data.author}">{data.author}</a>
	{#if data.error}
		<h1>{data.error.error}</h1>
		<p>{data.error.details}</p>
	{:else if data.entries && data.entries.items.length === 0}
		<p class="text-sm text-gray-500">Henüz hiçbir girdi yok.</p>
	{:else if data.entries}
		<p class="count">
			{data.entries.total} girdi
		</p>
		<div class="entries col">
			{#each data.entries.items as entry}
				<EntryItem {entry} showTitle={true} />
			{/each}
		</div>
	{:else}
		<p>Yazar bulunamadı.</p>
	{/if}
</div>

<style lang="scss">
	.author {
		max-width: 45rem;
	}

	.link {
		margin: 0;
		color: $light-grey;
		font-size: 1.375rem;
		font-weight: 800;
	}

	.count {
		margin: 0;
		color: $light-grey;
		font-size: 0.875rem;
		font-weight: 300;
		font-style: italic;
	}

	.entries {
		margin-top: 2rem;
	}
</style>
