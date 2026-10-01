import type { PageQuery, PageResult } from './types';

/** Match server page bounds; mocks are fixtures, not database query implementations. */
export function paginate<T>(items: T[], query: PageQuery = {}): PageResult<T> {
  const page = Number(query.page ?? 1);
  const pageSize = Number(query.pageSize ?? 20);
  if (
    !Number.isInteger(page) ||
    page < 1 ||
    page > 10_000 ||
    !Number.isInteger(pageSize) ||
    pageSize < 1 ||
    pageSize > 100
  ) {
    throw new Error('Invalid pagination: page 1..10000, pageSize 1..100');
  }
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    page,
    pageSize,
    total: items.length,
  };
}
