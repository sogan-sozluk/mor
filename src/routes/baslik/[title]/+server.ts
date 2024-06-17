import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const body = request.body;
	console.log(body);

	return new Response(null, { status: 204 });
};
