import * as env from '$env/static/public';
import { tokenStore } from '$lib/stores/user';
import type { Entry, ErrorResponse } from '$lib/types';
import { fetchApi } from '$lib/utils';
import { get } from 'svelte/store';

export const prerender = false;

export async function load({ params, fetch }) {
	const url = `${env.PUBLIC_API_URL}/entries/${params.id}`;
	const token = get(tokenStore);
	try {
		const response = await fetchApi(fetch, new URL(url), 'GET', token);

		if (response.ok) {
			const entry = await response.json();
			return {
				entry
			};
		}

		const error = await response.json();
		return {
			entry: null,
			error
		};
	} catch (e) {
		console.error(e);
		const error: ErrorResponse = {
			error: 'İstek Hatası',
			details: 'Girdi yüklenirken bir hata oluştu.'
		};

		return {
			entry: null,
			error
		};
	}
}

export type EntryData = {
	entry: Entry;
	error?: ErrorResponse;
};
