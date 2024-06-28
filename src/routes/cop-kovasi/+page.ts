import * as env from '$env/static/public';
import { tokenStore } from '$lib/stores/user';
import type { Entry, ErrorResponse, PaginationResponse } from '$lib/types';
import { get } from 'svelte/store';

export const prerender = false;

export async function load({ fetch, url }) {
	try {
		const page = Number(url.searchParams.get('page') || 1);
		const perPage = Number(url.searchParams.get('perPage') || 10);
		const fetchUrl = `${env.PUBLIC_API_URL}/self/bin?page=${page}&perPage=${perPage}`;

		const token = get(tokenStore);
		const response = await fetch(fetchUrl, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (response.ok) {
			const entries: PaginationResponse<Entry> = await response.json();
			const authorData: AuthorData = {
				entries,
				error: null
			};

			return authorData;
		} else {
			const error = await response.json();
			const authorData: AuthorData = {
				entries: null,
				error
			};

			return authorData;
		}
	} catch (e) {
		console.error(e);
		const error: ErrorResponse = {
			error: 'İstek Hatası',
			details: 'Girdiler yüklenirken bir hata oluştu.'
		};

		return {
			entries: [],
			error
		};
	}
}

export type AuthorData = {
	entries: PaginationResponse<Entry> | null;
	error: ErrorResponse | null;
};
