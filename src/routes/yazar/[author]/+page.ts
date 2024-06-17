export async function load({ params }) {
	return {
		author: params.author
	};
}

export type AuthorData = {
	author: string;
};
