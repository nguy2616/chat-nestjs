export type TPaginationResult<T> = {
  data: T[];
  totalItems: number;
  perPage: number;
  totalPages: number;
  page: number;
};
