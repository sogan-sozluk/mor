import type { EntryAuthor } from './EntryAuthor';

export type Entry = {
	id: number;
	title: string;
	content: string;
	author: EntryAuthor;
	createdAt: string;
	updatedAt: string;
};
