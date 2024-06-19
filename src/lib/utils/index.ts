export const fetchApi = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	url: URL,
	token: string | null
): Promise<Response> => {
	const response = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return response;
};
