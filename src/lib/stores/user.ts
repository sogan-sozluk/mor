import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initialNickname = browser ? localStorage.getItem('nickname') : null;
const initialToken = browser ? localStorage.getItem('token') : null;
const initialIsAdmin = browser ? localStorage.getItem('isAdmin') : null;
const initialIsModerator = browser ? localStorage.getItem('isModerator') : null;
export const nicknameStore = writable<string | null>(initialNickname);
export const tokenStore = writable<string | null>(initialToken);
export const isAdminStore = writable<boolean>(initialIsAdmin === 'true');
export const isModeratorStore = writable<boolean>(initialIsModerator === 'true');

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

isAdminStore.subscribe((value: boolean) => {
	if (browser && value !== null) {
		return localStorage.setItem('isAdmin', value.toString());
	} else if (browser && value === null) {
		return localStorage.removeItem('isAdmin');
	}
});

isModeratorStore.subscribe((value: boolean | null) => {
	if (browser && value !== null) {
		return localStorage.setItem('isModerator', value.toString());
	} else if (browser && value === null) {
		return localStorage.removeItem('isModerator');
	}
});
