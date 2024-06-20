<script lang="ts">
	import * as env from '$env/static/public';
	import type { ErrorResponse } from '$lib/types';
	import { goto } from '$app/navigation';

	// TODO: Implement register functionality
	let nickname: string = '';
	let password: string = '';
	let email: string = '';
	let confirmPass: string = '';
	let error: ErrorResponse | null = null;
	let isSubmitted = false;

	$: handleEmailInput = () => {
		if (!email.includes('@')) {
			error = {
				error: 'Geçersiz e-posta adresi.',
				details: 'Lütfen e-posta adresinizi kontrol edin.'
			};
		} else {
			error = null;
		}
	};

	$: {
		if (password.length > 0 && password.length < 8) {
			error = {
				error: 'Parola en az 8 karakter olmalıdır.',
				details: 'Lütfen daha güçlü bir parola seçin.'
			};
		} else if (password.length > 0 && !password.match(/[A-Z]/)) {
			error = {
				error: 'Parola en az bir büyük harf içermelidir.',
				details: 'Lütfen daha güçlü bir parola seçin.'
			};
		} else if (password.length > 0 && !password.match(/[a-z]/)) {
			error = {
				error: 'Parola en az bir küçük harf içermelidir.',
				details: 'Lütfen daha güçlü bir parola seçin.'
			};
		} else if (password.length > 0 && !password.match(/[0-9]/)) {
			error = {
				error: 'Parola en az bir sayı içermelidir.',
				details: 'Lütfen daha güçlü bir parola seçin.'
			};
		} else if (password !== confirmPass) {
			error = {
				error: 'Parolalar eşleşmiyor.',
				details: 'Lütfen parolaları kontrol edin.'
			};
		} else {
			error = null;
		}
	}

	const handleInput = () => {
		if (isSubmitted && error) {
			error = null;
			isSubmitted = false;
		}
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(`${env.PUBLIC_API_URL}/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nickname,
					email,
					password
				})
			});

			if (response.ok) {
				await goto('/giris-yap');
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
	<a class="header" href="/kayit-ol">Kayıt Ol</a>
	<input
		type="text"
		class="nickname"
		placeholder="Kullanıcı Adı"
		bind:value={nickname}
		on:input={handleInput}
	/>
	<input
		type="email"
		class="email"
		placeholder="E-posta"
		bind:value={email}
		on:input={handleEmailInput}
		on:input={handleInput}
	/>
	<input
		type="password"
		class="password"
		placeholder="Parola"
		bind:value={password}
		on:input={handleInput}
	/>
	<input
		type="password"
		class="confirm-password"
		placeholder="Parolayı Onayla"
		bind:value={confirmPass}
		on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
		on:input={handleInput}
	/>
	{#if error}
		<p class="error">{error.error} {error.details}</p>
	{/if}
	<button
		on:click={handleSubmit}
		disabled={!!error || !nickname || !email || !password || !confirmPass}
		class="btn">Kayıt Ol</button
	>
	<p>
		Zaten bir hesabın var mı? <a href="/giris-yap">Giriş Yap</a>
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
