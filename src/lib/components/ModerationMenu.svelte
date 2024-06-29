<script lang="ts">
	import type { StatisticsResponse } from '$lib/types';

	export let statistics: StatisticsResponse;
</script>

<div class="moderation-menu col w-full">
	<ul class="titles col gap-1">
		<a href={'#'}>
			<li class="title justify-between gap-05">
				<p class="name">Başlıklar</p>
				<p class="entry-count">{statistics.titleCount}</p>
			</li>
		</a>
		<a href={'#'}>
			<li class="title justify-between gap-05">
				<p class="name">Girdiler</p>
				<p class="entry-count">{statistics.entryCount}</p>
			</li>
		</a>
		<a href={'#'}>
			<li class="title justify-between gap-05">
				<p class="name">Kullanıcılar</p>
				<p class="entry-count">{statistics.userCount}</p>
			</li>
		</a>
		<a href={'#'}>
			<li class="title justify-between gap-05">
				<p class="name">Ekip</p>
				<p class="entry-count">{statistics.crewCount}</p>
			</li>
		</a>
	</ul>
</div>

<style lang="scss">
	.moderation-menu {
		max-width: 16.25rem;
		gap: 1.5rem;
	}

	ul {
		li {
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
</style>
