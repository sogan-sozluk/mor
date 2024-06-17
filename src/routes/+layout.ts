import * as env from '$env/static/public';
import type { PaginationResponse, TitleExplorerItem } from '$lib/types';

export const prerender = true;

export async function load({ fetch }) {
	const todayUrl = `${env.PUBLIC_API_URL}/today?page=0&perPage=20`;
	const trendsUrl = `${env.PUBLIC_API_URL}/trends?page=0&perPage=20`;

	const todayResponse = await fetch(todayUrl);
	const trendsResponse = await fetch(trendsUrl);

	const todayTitles: PaginationResponse<TitleExplorerItem> = await todayResponse.json();
	const trendsTitles: PaginationResponse<TitleExplorerItem> = await trendsResponse.json();

	return {
		todayTitles,
		trendsTitles
	};
}

export type ExplorerData = {
	todayTitles: PaginationResponse<TitleExplorerItem>;
	trendsTitles: PaginationResponse<TitleExplorerItem>;
};
