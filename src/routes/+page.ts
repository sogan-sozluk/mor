import * as env from '$env/static/public';
import type EntryItem from '$lib/components/EntryItem.svelte';
import type { Entry } from '$lib/types';

export const prerender = false;

export async function load({ fetch }) {
	const url = `${env.PUBLIC_API_URL}/feed`;
	const res = await fetch(url);
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
