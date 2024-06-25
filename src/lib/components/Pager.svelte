<script lang="ts">
	export let totalPage = 1;
	export let currentPage = 1;

	// TODO: Make perPage dynamic
	const perPage = 10;
	const buildQuery = (page: number) => `?perPage=${perPage}&page=${page}`;
</script>

<div class="pager row gap-025">
	{#if currentPage > 1}
		<a class="jump" href={buildQuery(1)}>{'<<'}</a>
		<a class="walk" href={buildQuery(currentPage - 1)}>{'<'}</a>
	{/if}
	<div class="index flex center-items">{`${currentPage}/${totalPage}`}</div>
	{#if currentPage < totalPage}
		<a class="walk" href={buildQuery(currentPage + 1)}>{'>'}</a>
		<a class="jump" href={buildQuery(totalPage)}>{'>>'}</a>
	{/if}
</div>

<style lang="scss">
	.pager {
		width: fit-content;
	}

	.index {
		width: 3.5rem;
		background-color: $dark-purple-200;
		color: $light-purple;
		text-align: center;
		font-size: 0.875rem;
		cursor: default;
	}

	.index,
	.jump,
	.walk {
		border: 1px solid $white;
		border-radius: 0.25rem;
	}

	.jump,
	.walk {
		padding: 0 0.25rem;
		background-color: $dark-purple-200;

		&:hover {
			background-color: $dark-purple-100;
			color: $white;
			text-decoration: none;
		}
	}
</style>
