<script lang="ts">
	import type { TitleExplorerItem } from '$lib/types';
	import { onMount } from 'svelte';

	let tabs = ['Bugün', 'Gündem'];
	let activeTabIdx = 0;
	let isHidden = false;

	export let todayTitles: TitleExplorerItem[] = [];
	export let trendTitles: TitleExplorerItem[] = [];

	const onTabClick = (idx: number) => {
		activeTabIdx = idx;
		isHidden = false;
	};

	onMount(() => {
		const updateVisibility = () => {
			if (window.innerWidth <= 670) {
				isHidden = true;
			} else {
				isHidden = false;
			}
		};

		updateVisibility();
		window.addEventListener('resize', updateVisibility);

		return () => {
			window.removeEventListener('resize', updateVisibility);
		};
	});
</script>

<div class="title-explorer col">
	<div class="header row justify-between">
		<div class="tabs row gap-1">
			{#each tabs as tab, idx}
				<button class:active={idx === activeTabIdx && !isHidden} on:click={() => onTabClick(idx)}>
					{tab}
				</button>
			{/each}
		</div>
		<button class="hide hidden" class:hidden={isHidden} on:click={() => (isHidden = !isHidden)}>
			Gizle
		</button>
	</div>
	<ul class="titles col gap-1" class:hidden={isHidden}>
		{#if activeTabIdx === 0}
			{#each todayTitles as title}
				<a href="/baslik/{title.name}">
					<li class="title justify-between gap-05">
						<p class="name">
							{title.name}
						</p>
						<p class="entry-count">
							{title.entryCount}
						</p>
					</li>
				</a>
			{/each}
		{:else}
			{#each trendTitles as title}
				<a href="/baslik/{title.name}">
					<li class="title justify-between gap-05">
						<p class="name">
							{title.name}
						</p>
						<p class="entry-count">
							{title.entryCount}
						</p>
					</li>
				</a>
			{/each}
		{/if}
	</ul>
</div>

<style lang="scss">
	.title-explorer {
		width: 100%;
		max-width: 16.25rem;
		gap: 1.5rem;
		.tabs {
			button {
				padding: 0;
				border: none;
				background-color: transparent;
				color: $grey;
				font-size: 1.25rem;
				font-weight: 500;

				&.active {
					color: $light-purple;
				}

				&:hover {
					text-decoration: underline;
				}
			}
		}
		.titles {
			.title {
				.name {
					font-size: 0.875rem;
					color: $light-grey;
				}

				.entry-count {
					font-size: 0.875rem;
					color: $grey;
				}
			}
		}
	}

	.hide {
		display: none;
		border: 1px solid $light-grey;
		padding: 0 0.5rem;
	}

	.hidden {
		display: none !important;
	}

	@media (max-width: 670px) {
		.title-explorer {
			max-width: unset;
		}

		.hide {
			display: block;
		}
	}
</style>
