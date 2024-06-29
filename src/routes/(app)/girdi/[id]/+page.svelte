<script lang="ts">
	import EntryItem from '$lib/components/EntryItem.svelte';
	import type { EntryData } from './+page';

	export let data: EntryData;
</script>

{#if data.error}
	<div class="w-full col">
		<h1>{data.error.error}</h1>
		<p>{data.error.details}</p>
	</div>
{:else}
	<EntryItem entry={data.entry} />
{/if}
