<script lang="ts">
	import burgerIcon from '$lib/images/icons/dots.svg';

	let isOpen = false;
	let onClick = () => {
		isOpen = !isOpen;
	};
</script>

<div class="burger-menu">
	<button class="center-items" on:click={onClick}>
		<img src={burgerIcon} alt="logo" />
	</button>
	{#if isOpen}
		<div class="menu col">
			<a href="/cop-kovasi">çöp kovası</a>
			<a href="/cikis-yap">çıkış yap</a>
		</div>
	{/if}
</div>

<style lang="scss">
	button {
		border: none;
		background: none;
		cursor: pointer;
		height: 2rem;

		&:hover {
			background-color: transparent;
		}
	}

	.menu {
		min-width: 8rem;
		min-height: 3.75rem;
		position: absolute;
		justify-content: space-around;
		background-color: $dark-purple-100;
		border: 1px solid $light-grey;
		border-radius: 0.5rem;
		padding: 0.5rem;
		a {
			color: $white;
			font-size: 0.875rem;
			font-weight: 500;

			&:hover {
				text-decoration: underline;
			}
		}

		@media (max-width: 1686px) {
			right: 1rem;
		}
	}
</style>
