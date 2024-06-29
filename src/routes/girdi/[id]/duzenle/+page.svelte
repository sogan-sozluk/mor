<script lang="ts">
	import EditEntry from '$lib/components/EditEntry.svelte';
	import type { EditData } from './+page';

	export let data: EditData;
</script>

{#if data.error}
	<div class="w-full col">
		<h1>{data.error.error}</h1>
		<p>{data.error.details}</p>
	</div>
{:else}
	<EditEntry entry={data.entry} />
{/if}
