<script lang="ts">
	import profileIcon from '$lib/images/icons/profile.svg';
	import { nicknameStore } from '$lib/stores/user';

	let url = '/giris-yap';
	$: nickname = $nicknameStore;
	$: url = nickname ? `/yazar/${nickname}` : '/giris-yap';
</script>

<a class="profile row gap-05 center-items" href={url}>
	<div class="ellipse center-items">
		<img src={profileIcon} alt="profile" />
	</div>
	{#if nickname}
		<p>Kendim</p>
	{:else}
		<p>Giriş Yap</p>
	{/if}
</a>

<style lang="scss">
	.ellipse {
		background-color: $dark-purple-200;
		border-radius: 100%;
		width: calc(2rem - 2px);
		height: calc(2rem - 2px);
		border: 1px solid $light-grey;
	}
	.profile {
		background: none;
		border: none;
		color: $white;
		cursor: pointer;
		img {
			max-height: 1.5rem;
		}

		p {
			color: $white;
		}
	}
</style>
