<script lang="ts">
	import type { Entry } from '$lib/types';
	import upvote from '$lib/images/icons/upvote.svg';
	import downvote from '$lib/images/icons/downvote.svg';
	import favorite from '$lib/images/icons/favorite.svg';
	import unfavorite from '$lib/images/icons/unfavorite.svg';
	import { nicknameStore } from '$lib/stores/user';

	export let entry: Entry;
	export let showTitle = true;
	$: isloggedIn = !!$nicknameStore;
</script>

<div class="entry-item col gap-1 w-full">
	{#if showTitle}
		<a href="/baslik/{entry.title.name}" class="title">{entry.title.name}</a>
	{/if}
	<div class="content">
		{entry.content}
	</div>
	{#if isloggedIn}
		<div class="actions row gap-05">
			<button class="upvote">
				<img src={upvote} alt="Upvote" />
			</button>
			<button class="downvote">
				<img src={downvote} alt="Downvote" />
			</button>
			{#if entry.isFavorite}
				<button class="unfavorite">
					<img src={unfavorite} alt="Downvote" />
				</button>
			{:else}
				<button class="favorite">
					<img src={favorite} alt="Downvote" />
				</button>
			{/if}
		</div>
	{/if}
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

	.actions button {
		padding: 0;
		border: none;
		background: none;
		img {
			max-width: 1rem;
			max-height: 1rem;
		}
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
