import * as env from '$env/static/public';
import type EntryItem from '$lib/components/EntryItem.svelte';
import { tokenStore } from '$lib/stores/user';
import type { Entry } from '$lib/types';
import { get } from 'svelte/store';

export const prerender = true;

export async function load({ fetch }) {
	const fetchUrl = `${env.PUBLIC_API_URL}/feed`;
	const token = get(tokenStore);
	const res = await fetch(fetchUrl, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	let entries: EntryItem[] = [];
	if (res.ok) {
		entries = await res.json();
	}

	return {
		entries: entries
	};
}

export type FeedData = {
	entries: Entry[];
};
