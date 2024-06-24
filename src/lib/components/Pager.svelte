<script lang="ts">
	import { tokenStore } from '$lib/stores/user';
	import type { PaginationResponse } from '$lib/types';
	import { get } from 'svelte/store';

	export let total = 0;
	export let perPage = 10;
	let totalPage = 0;
	export let currentPage = 1;
	export let paginatedData: PaginationResponse<unknown>;
	export let baseUrl: string;

	$: totalPage = Math.ceil(total / perPage);

	const handlePageChange = async (page: number) => {
		if (page < 1) {
			currentPage = 1;
		} else if (page > totalPage) {
			currentPage = totalPage;
		} else {
			currentPage = page;
		}

		try {
			const url = `${baseUrl}?page=${currentPage - 1}&perPage=${perPage}`;
			const token = get(tokenStore);
			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (res.ok) {
				paginatedData = await res.json();
			} else {
				console.error(res.statusText);
			}
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div class="pager row gap-025">
	<button class="head" on:click={() => handlePageChange((currentPage = 1))}>{'<<'}</button>
	<button class="pre" on:click={() => handlePageChange(--currentPage)}>{'<'}</button>
	<button class="page">{`${currentPage}/${totalPage}`}</button>
	<button class="next" on:click={() => handlePageChange(++currentPage)}>{'>'}</button>
	<button class="end" on:click={() => handlePageChange((currentPage = totalPage))}>{'>>'}</button>
</div>

<style lang="scss">
	.pager {
		width: fit-content;
	}
	button {
		height: calc(2rem + 2px);
		border: 1px solid $light-grey;
		padding: 0 0.5rem;
	}

	.page {
		width: 5rem;
	}
</style>
