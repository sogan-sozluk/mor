<script lang="ts">
	import EntryItem from '$lib/components/EntryItem.svelte';
	import Pager from '$lib/components/Pager.svelte';
	import { nicknameStore } from '$lib/stores/user';
	import type { AuthorData } from './+page';

	export let data: AuthorData;

	// TODO: Add title and meta tags
</script>

<div class="author w-full col">
	<a class="link" href="yazar/{$nicknameStore}">{$nicknameStore}</a>
	{#if data.error}
		<h1>{data.error.error}</h1>
		<p>{data.error.details}</p>
	{:else if data.entries && data.entries.items.length === 0}
		<p class="text-sm text-gray-500">Çöp bomboş.</p>
	{:else if data.entries}
		<p class="count">
			{data.entries.total} çöp
		</p>
		<div class="entries col">
			<div class="pager-wrapper">
				<Pager
					totalPage={Math.ceil(data.entries.total / data.entries.perPage)}
					currentPage={data.entries.page}
				/>
			</div>
			{#each data.entries.items as entry}
				<EntryItem {entry} showTitle={true} />
			{/each}
		</div>
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

	.pager-wrapper {
		display: flex;
		max-width: 45rem;
		justify-content: flex-end;
	}

	.entries {
		margin-top: 2rem;
	}
</style>
