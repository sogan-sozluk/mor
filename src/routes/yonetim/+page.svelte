<script lang="ts">
	import { goto } from '$app/navigation';
	import { isAdminStore } from '$lib/stores/user';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$isAdminStore) goto('/');
	});
</script>

<div>
	<h1>Yönetim</h1>
</div>
