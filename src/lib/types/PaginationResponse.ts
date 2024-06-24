export type PaginationResponse<T> = {
	total: number;
	page: number;
	perPage: number;
	items: T[];
};
