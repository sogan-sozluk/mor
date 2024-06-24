import * as env from '$env/static/public';
import { tokenStore } from '$lib/stores/user.js';
import type { Entry, ErrorResponse, PaginationResponse } from '$lib/types';
import { get } from 'svelte/store';

export const prerender = false;

export async function load({ params, fetch, url }) {
	try {
		const page = url.searchParams.get('page') || '0';
		const perPage = url.searchParams.get('perPage') || '10';
		const fetchUrl = `${env.PUBLIC_API_URL}/titles/${params.title}/entries?page=${page}&perPage=${perPage}`;

		const token = get(tokenStore);
		const res = await fetch(fetchUrl, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (res.ok) {
			const entries: PaginationResponse<Entry> = await res.json();
			return {
				title: params.title,
				entries
			};
		} else {
			const error = await res.json();
			return {
				title: params.title,
				entries: [],
				error
			};
		}
	} catch (e) {
		console.error(e);
		const error: ErrorResponse = {
			error: 'İstek Hatası',
			details: 'Girdiler yüklenirken bir hata oluştu.'
		};

		return {
			title: params.title,
			entries: [],
			error
		};
	}
}

export type TitleData = {
	title: string;
	entries: PaginationResponse<Entry>;
	error?: ErrorResponse;
};
