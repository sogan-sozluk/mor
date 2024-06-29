<script lang="ts">
	import { goto } from '$app/navigation';
	import * as env from '$env/static/public';
	import bin from '$lib/images/icons/bin.svg';
	import downvote from '$lib/images/icons/downvote.svg';
	import downvoted from '$lib/images/icons/downvoted.svg';
	import edit from '$lib/images/icons/edit.svg';
	import favorite from '$lib/images/icons/favorite.svg';
	import recover from '$lib/images/icons/recover.svg';
	import unfavorite from '$lib/images/icons/unfavorite.svg';
	import upvote from '$lib/images/icons/upvote.svg';
	import upvoted from '$lib/images/icons/upvoted.svg';
	import { nicknameStore, tokenStore } from '$lib/stores/user';
	import type { Entry } from '$lib/types';
	import { fetchApi, formatDates } from '$lib/utils';

	export let entry: Entry | null;
	export let showTitle = true;

	const dates = entry ? formatDates(entry.createdAt, entry.updatedAt) : '';

	$: isLoggedIn = !!$tokenStore;
	$: isSelf = entry && $nicknameStore === entry.author.nickname;

	const handleFavorite = async () => {
		if (!entry) return;
		const url = `${env.PUBLIC_API_URL}/entries/${entry.id}/favorite`;
		const res = await fetchApi(fetch, new URL(url), 'POST', $tokenStore);
		if (res.ok) {
			entry.isFavorite = true;
		}
	};

	const handleUnfavorite = async () => {
		if (!entry) return;
		const url = `${env.PUBLIC_API_URL}/entries/${entry.id}/unfavorite`;
		const res = await fetchApi(fetch, new URL(url), 'POST', $tokenStore);
		if (res.ok) {
			entry.isFavorite = false;
		}
	};

	const handleUnvote = async () => {
		if (!entry) return;
		const url = `${env.PUBLIC_API_URL}/entries/${entry.id}/unvote`;
		const res = await fetchApi(fetch, new URL(url), 'POST', $tokenStore);
		if (res.ok) {
			entry.vote = null;
		}
	};

	const handleVote = async (vote: 'Up' | 'Down') => {
		if (!entry) return;
		const url = `${env.PUBLIC_API_URL}/entries/${entry.id}/vote/${vote.toLowerCase()}`;
		const res = await fetchApi(fetch, new URL(url), 'POST', $tokenStore);
		if (res.ok) {
			entry.vote = vote;
		}
	};

	const handleSoftDelete = async () => {
		if (!entry) return;
		const url = `${env.PUBLIC_API_URL}/entries/${entry.id}/soft-delete`;
		const res = await fetchApi(fetch, new URL(url), 'DELETE', $tokenStore);
		if (res.ok) {
			entry.deletedAt = new Date().toLocaleString();
		}
	};

	const handleRecover = async () => {
		if (!entry) return;
		const url = `${env.PUBLIC_API_URL}/entries/${entry.id}/recover`;
		const res = await fetchApi(fetch, new URL(url), 'PATCH', $tokenStore);
		if (res.ok) {
			entry.deletedAt = null;
		}
	};

	const handleDelete = async () => {
		if (!entry) return;
		const url = `${env.PUBLIC_API_URL}/entries/${entry.id}`;
		const res = await fetchApi(fetch, new URL(url), 'DELETE', $tokenStore);
		if (res.ok) {
			entry = null;
		}
	};

	const handleEdit = () => {
		if (entry) {
			goto(`/girdi/${entry.id}/duzenle`);
		}
	};
</script>

<div class="entry-item col gap-1 w-full">
	{#if entry}
		{#if showTitle}
			<a href="/baslik/{entry.title.name}" class="title">{entry.title.name}</a>
		{/if}
		<div class="content">
			{entry.content}
		</div>
		{#if isLoggedIn}
			<div class="actions row">
				<div class="pub row gap-05">
					{#if entry.vote === 'Up'}
						<button class="upvoted" on:click={handleUnvote}>
							<img src={upvoted} alt="beğenmeyi geri al" title="beğenmeyi geri al" />
						</button>
					{:else}
						<button class="upvote" on:click={() => handleVote('Up')}>
							<img src={upvote} alt="beğen" title="beğen" />
						</button>
					{/if}
					{#if entry.vote === 'Down'}
						<button class="downvoted" on:click={handleUnvote}>
							<img src={downvoted} alt="beğenmemeyi geri al" title="beğenmemeyi geri al" />
						</button>
					{:else}
						<button class="downvote" on:click={() => handleVote('Down')}>
							<img src={downvote} alt="beğenme" title="beğenme" />
						</button>
					{/if}
					{#if entry.isFavorite}
						<button class="unfavorite" on:click={handleUnfavorite}>
							<img src={unfavorite} alt="favoriden çıkar" title="favoriden çıkar" />
						</button>
					{:else}
						<button class="favorite" on:click={handleFavorite}>
							<img src={favorite} alt="favoriye ekle" title="favoriye ekle" />
						</button>
					{/if}
				</div>
				{#if isSelf}
					<div class="priv row gap-05">
						{#if entry.deletedAt}
							<button class="recover" on:click={handleRecover}>
								<img src={recover} alt="kurtar" title="kurtar" />
							</button>
							<button class="delete" on:click={handleDelete}>
								<img src={bin} alt="sil" title="sil" />
							</button>
						{:else}
							<button class="edit" on:click={handleEdit}>
								<img src={edit} alt="düzenle" title="düzenle" />
							</button>
							<button class="delete" on:click={handleSoftDelete}>
								<img src={bin} alt="çöpe at" title="çöpe at" />
							</button>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
		<div>
			<div class="author">
				<a href="/yazar/{entry.author.nickname}">{entry.author.nickname}</a>
			</div>
			<div class="date">
				<a class="link" href="/girdi/{entry.id}">{dates}</a>
			</div>
		</div>
	{/if}
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

	.actions {
		justify-content: space-between;
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

	.date .link {
		color: $grey;
		font-size: 0.75rem;
	}
</style>
