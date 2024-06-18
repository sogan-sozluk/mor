<script lang="ts">
	import type { Entry } from '$lib/types';

	export let entry: Entry;
	export let showTitle = true;
</script>

<div class="entry-item col gap-1 w-full">
	{#if showTitle}
		<a href="/baslik/{entry.title.name}" class="title">{entry.title.name}</a>
	{/if}
	<div class="content">
		{entry.content}
	</div>
	<div class="actions"></div>
	<div>
		<div class="author">
			<a href="/yazar/{entry.author.nickname}">{entry.author.nickname}</a>
		</div>
		<div class="date">
			<p>{entry.createdAt} ~ {entry.updatedAt}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.entry-item {
		max-width: 45rem;
	}

	.title {
		margin: 0;
		color: $light-grey;
		font-size: 1.375rem;
		font-weight: 800;
	}

	.content {
		line-height: 1.4;
	}

	.author,
	.date {
		text-align: right;
	}

	.author {
		font-size: 0.875rem;
	}

	.date {
		color: $grey;
		font-size: 0.75rem;
	}
</style>
