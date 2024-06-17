<script lang="ts">
	export let total = 0;
	export let perPage = 10;
	let totalPage = 0;
	export let currentPage = 1;

	$: totalPage = Math.ceil(total / perPage);
</script>

<div class="pager row gap-025">
	<button class="head" on:click={() => (currentPage = 1)}>{'<<'}</button>
	<button class="pre" on:click={() => currentPage--}>{'<'}</button>
	<button class="page">{`${currentPage}/${totalPage}`}</button>
	<button class="next" on:click={() => (currentPage = currentPage + 1)}>{'>'}</button>
	<button class="end" on:click={() => (currentPage = totalPage)}>{'>>'}</button>
</div>

<style lang="scss">
	button {
		height: calc(2rem + 2px);
		border: 1px solid $light-grey;
		padding: 0 0.5rem;
	}

	.page {
		width: 5rem;
	}
</style>
