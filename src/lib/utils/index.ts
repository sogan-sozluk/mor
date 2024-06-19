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

export const formatDates = (createdAt: string, updatedAt: string | null): string => {
	const createdAtDate = new Date(createdAt);
	const updatedAtDate = updatedAt ? new Date(updatedAt) : null;

	const createdAtShort = createdAtDate.toLocaleString([], {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	let updatedAtShort = null;

	if (updatedAtDate) {
		if (
			updatedAtDate.getFullYear() !== createdAtDate.getFullYear() ||
			updatedAtDate.getMonth() !== createdAtDate.getMonth() ||
			updatedAtDate.getDate() !== createdAtDate.getDate()
		) {
			updatedAtShort = updatedAtDate.toLocaleString([], {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} else {
			updatedAtShort = updatedAtDate.toLocaleString([], {
				hour: '2-digit',
				minute: '2-digit'
			});
		}
	}

	const dates = updatedAtShort ? `${createdAtShort} ~ ${updatedAtShort}` : `${createdAtShort}`;
	return dates;
};
