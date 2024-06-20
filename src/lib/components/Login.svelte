<script lang="ts">
	import * as env from '$env/static/public';
	import type { ErrorResponse, LoginResponse } from '$lib/types';
	import { nicknameStore } from '$lib/stores/user';

	let nickname: string = '';
	let password: string = '';
	let error: ErrorResponse | null = null;
	let isSubmitted = false;

	const handleInput = () => {
		if (isSubmitted && error) {
			error = null;
			isSubmitted = false;
		}
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(`${env.PUBLIC_API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nickname: nickname,
					password
				})
			});

			if (response.ok) {
				const loginResponse: LoginResponse = await response.json();
				localStorage.setItem('token', loginResponse.token);
				nicknameStore.set(nickname);
				location.href = '/';
			} else {
				const errorResponse: ErrorResponse = await response.json();
				error = errorResponse;
			}

			isSubmitted = true;
		} catch (e) {
			console.error(e);
			error = {
				error: 'İstek başarısız oldu.',
				details: 'Lütfen daha sonra tekrar deneyin.'
			};
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
		on:input={handleInput}
	/>
	<input
		type="password"
		class="password"
		placeholder="Parola"
		bind:value={password}
		on:input={handleInput}
		on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
	/>
	{#if !!error}
		<p class="error">{error.details}</p>
	{/if}
	<button on:click={handleSubmit} disabled={!!error || !nickname || !password}>Giriş Yap</button>
	<p>
		Hesabın yok mu? <a href="/kayit-ol">Kayıt ol</a>
	</p>
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
