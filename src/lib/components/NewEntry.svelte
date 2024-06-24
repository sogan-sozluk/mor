<script lang="ts">
	import { goto } from '$app/navigation';
	import * as env from '$env/static/public';
	import type { CreateEntryResponse } from '$lib/types';
	import { onMount } from 'svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let title: string;
	let entryContent: string;
	let nickname: string | null;
	$: submitting = false;

	const handleSubmit = async () => {
		if (submitting) return;
		submitting = true;
		const response = await fetch(`${env.PUBLIC_API_URL}/entries`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				title,
				content: entryContent
			})
		});

		if (response.ok) {
			const entry: CreateEntryResponse = await response.json();
			entryContent = '';
			goto(`/girdi/${entry.id}`);
		}

		submitting = false;
	};

	onMount(() => {
		nickname = localStorage.getItem('nickname');
	});
</script>

<div class="new-entry w-full col" class:hidden={nickname === null}>
	<textarea
		class="w-full"
		name="q"
		placeholder="Bu konuda bizi aydınlat..."
		bind:value={entryContent}
	></textarea>
	{#if submitting}
		<LoadingSpinner size="small" />
	{:else}
		<button on:click={handleSubmit}>Gönder</button>
	{/if}
</div>

<style lang="scss">
	.new-entry {
		max-width: 45rem;
		display: flex;
		gap: 0.5rem;
	}

	textarea {
		padding: 0.5rem;
		min-height: 10rem;
		width: calc(100% - 2rem);
		background-color: $light-grey;
	}

	input {
		padding: 0 0.5rem;
	}

	button {
		width: fit-content;
		padding: 0 1rem;
		height: calc(2rem - 2px);
		border: 1px solid $light-grey;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		max-width: 1rem;
		max-height: 1rem;
	}

	.hidden {
		display: none;
	}
</style>
