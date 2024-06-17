<script lang="ts">
	import EntryItem from '$lib/components/EntryItem.svelte';
	import type { TitleData } from './+page';

	export let data: TitleData;
</script>

<div class="w-full col gap-1">
	<a class="title" href="/baslik/{data.title}">{data.title}</a>
	{#each data.entries as entry}
		<EntryItem {entry} showTitle={false} />
	{/each}
</div>

<style lang="scss">
	.title {
		margin: 0;
		color: $light-grey;
		font-size: 1.375rem;
		font-weight: 800;
	}
</style>
