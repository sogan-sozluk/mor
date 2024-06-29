import * as env from '$env/static/public';
import { tokenStore } from '$lib/stores/user';
import type { ErrorResponse, StatisticsResponse } from '$lib/types';
import { fetchApi } from '$lib/utils/index.js';
import { get } from 'svelte/store';

export const prerender = true;

export async function load({ fetch }) {
	const url = `${env.PUBLIC_API_URL}/statistics`;
	const token = get(tokenStore);
	try {
		const res = await fetchApi(fetch, new URL(url), 'GET', token);
		if (res.ok) {
			const statistics = await res.json();
			const data: ModeratorMenuData = {
				statistics,
				error: null
			};

			return data;
		} else if (res.status === 401) {
			return {
				redirect: '/giris'
			};
		}

		const error: ErrorResponse = await res.json();
		const data: ModeratorMenuData = {
			statistics: null,
			error
		};

		return data;
	} catch (e) {
		console.error(e);
	}
}

export type ModeratorMenuData = {
	statistics: StatisticsResponse | null;
	error: ErrorResponse | null;
};
