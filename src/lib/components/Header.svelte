<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import logo from '$lib/images/logo.svg';
	import onion from '$lib/images/onion.svg';
	import BurgerMenu from './DotsMenu.svelte';
	import Profile from './Profile.svelte';
</script>

<header class="w-full center-items">
	<div class="content w-full row align-center">
		<a href="/">
			<img class="logo" src={logo} alt="logo" />
			<img class="onion" src={onion} alt="onion" />
		</a>
		<Search />
		<div class="menus row center-items gap-1">
			<Profile />
			<BurgerMenu />
		</div>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0;
		border-bottom: 1px solid $light-grey;
		background-color: $dark-purple-100;
	}

	.content {
		margin: 0 1rem;
		max-width: 90rem;
		justify-content: space-between;
		min-height: 5rem;
		gap: 0.5rem;
	}

	.logo {
		max-height: 2rem;
	}

	.onion {
		display: none;
	}

	@media (max-width: 768px) {
		.logo {
			display: none;
		}
		.onion {
			display: block;
			max-height: 2rem;
		}

		:global(.profile p) {
			display: none;
		}
	}
</style>
