<script lang="ts">
	import { goto } from '$app/navigation';
	import * as env from '$env/static/public';
	import { tokenStore } from '$lib/stores/user';
	import type { Entry, ErrorResponse } from '$lib/types';
	import type { UpdateEntryRequest } from '$lib/types';

	export let entry: Entry | null;
	export let showTitle = true;
	let error: ErrorResponse | null = null;

	const handleSave = async () => {
		if (!entry) return;
		var paylod: UpdateEntryRequest = {
			content: entry.content
		};
		const url = `${env.PUBLIC_API_URL}/entries/${entry.id}`;
		const res = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$tokenStore}`
			},
			body: JSON.stringify(paylod)
		});

		if (res.ok) {
			goto(`/girdi/${entry.id}`);
		} else {
			error = await res.json();
		}
	};
</script>

{#if entry}
	<div class="edit-entry col gap-1 w-full">
		{#if showTitle}
			<a href="/baslik/{entry.title.name}" class="title">{entry.title.name}</a>
		{/if}
		<textarea bind:value={entry.content} class="w-full" rows={10} />
		{#if error}
			<div class="error-wrapper col gap-05">
				<p class="error">{error.error}</p>
				<p class="error-details">{error.details}</p>
			</div>
		{/if}
		<button class="btn" on:click={handleSave}>Kaydet</button>
	</div>
{/if}

<style lang="scss">
	.edit-entry {
		max-width: 45rem;
	}

	.title {
		margin: 0;
		color: $light-grey;
		font-size: 1.375rem;
		font-weight: 800;
	}

	.error,
	.error-details {
		margin: 0;
		font-size: 0.875rem;
		color: $light-purple;
		font-style: italic;
	}

	.btn {
		width: fit-content;
		padding: 0 1rem;
		height: calc(2rem - 2px);
		border: 1px solid $light-grey;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
