import type { Author } from './Author';
import type { Title } from './Title';

export type Entry = {
	id: number;
	title: Title;
	content: string;
	author: Author;
	isFavorite: boolean | null;
	createdAt: string;
	updatedAt: string;
};
