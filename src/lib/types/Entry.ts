import type { Author } from './Author';
import type { Title } from './Title';

export type Entry = {
	id: number;
	title: Title;
	content: string;
	author: Author;
	vote: 'Up' | 'Down' | null;
	isFavorite: boolean | null;
	createdAt: string;
	updatedAt: string;
	deleteAt: string | null;
};
