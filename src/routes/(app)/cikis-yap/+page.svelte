<script lang="ts">
	import { goto } from '$app/navigation';
	import { nicknameStore, tokenStore } from '$lib/stores/user';
	import { onMount } from 'svelte';

	onMount(() => {
		tokenStore.set(null);
		nicknameStore.set('');
		goto('/');
	});
</script>
