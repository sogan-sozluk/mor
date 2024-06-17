<script lang="ts">
	import * as env from '$env/static/public';
	import type { ErrorResponse, LoginResponse } from '$lib/types';

	let nickname: string;
	let password: string;
	let failed = false;
	let error: ErrorResponse;

	const handleSubmit = async () => {
		const response = await fetch(`${env.PUBLIC_API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nickname,
				password
			})
		});

		if (response.ok) {
			const loginResponse: LoginResponse = await response.json();
			localStorage.setItem('token', loginResponse.token);
			localStorage.setItem('nickname', nickname);
			location.href = '/';
		} else {
			failed = true;
			error = await response.json();
		}
	};
</script>

<div class="login w-full col gap-05">
	<a class="header" href="/giris-yap">Giriş Yap</a>
	<input
		type="text"
		class="nickname"
		placeholder="Kullanıcı Adı"
		bind:value={nickname}
		class:failed
	/>
	<input
		type="password"
		class="password"
		placeholder="Parola"
		bind:value={password}
		class:failed
		on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
	/>
	{#if failed && error}
		<p class="error">{error.details}</p>
	{/if}
	<button on:click={handleSubmit}>Giriş Yap</button>
</div>

<style lang="scss">
	.header {
		margin: 0;
		color: $light-grey;
		font-size: 1.375rem;
		font-weight: 800;
	}

	input {
		min-height: 1.875rem;
		max-width: 20rem;
	}

	button {
		width: fit-content;
		height: calc(2rem - 2px);
	}

	.error {
		color: $light-purple;
		font-size: 0.875rem;
		font-style: italic;
	}
</style>
