<script lang="ts">
	import searchIcon from '$lib/images/icons/search.svg';
</script>

<form class="w-full" action="/search" method="get">
	<input class="w-full" type="search" name="q" placeholder="arat bakalım..." />
	<button class="row center-items gap-05" type="submit">
		<img class="center-items" src={searchIcon} alt="Search" />
	</button>
</form>

<style lang="scss">
	form {
		max-width: 30rem;
		display: flex;
		gap: 0.5rem;
	}

	input {
		padding: 0 0.5rem;
	}

	button {
		padding: 0 1rem;
		height: calc(2rem - 2px);
		border: 1px solid $light-grey;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		max-width: 1rem;
		max-height: 1rem;
	}
</style>
