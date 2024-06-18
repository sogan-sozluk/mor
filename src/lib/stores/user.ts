import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initialNickname = browser ? localStorage.getItem('nickname') : null;
const initialToken = browser ? localStorage.getItem('token') : null;
export const nicknameStore = writable<string | null>(initialNickname);
export const tokenStore = writable<string | null>(initialToken);

nicknameStore.subscribe((value: string | null) => {
	if (browser && value) {
		return localStorage.setItem('nickname', value);
	} else if (browser && !value) {
		return localStorage.removeItem('nickname');
	}
});

tokenStore.subscribe((value: string | null) => {
	if (browser && value) {
		return localStorage.setItem('token', value);
	} else if (browser && !value) {
		return localStorage.removeItem('token');
	}
});
