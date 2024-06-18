import * as env from '$env/static/public';
import type EntryItem from '$lib/components/EntryItem.svelte';
import type { Entry, PaginationResponse } from '$lib/types';

export const prerender = false;

export async function load({ params }) {
	const url = `${env.PUBLIC_API_URL}/titles/${params.title}/entries?page=0&perPage=10`;
	const res = await fetch(url);
	let entries: PaginationResponse<EntryItem> = { total: 0, page: 0, perPage: 0, data: [] };
	if (res.ok) {
		entries = await res.json();
	}

	return {
		title: params.title,
		entries: entries.data
	};
}

export type TitleData = {
	title: string;
	entries: Entry[];
};
