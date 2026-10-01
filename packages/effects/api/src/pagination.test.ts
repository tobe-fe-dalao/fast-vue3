import { describe, expect, it } from 'vitest';

import { paginate } from './pagination';

describe('pagination contract', () => {
  it('returns an isolated page and the full count', () => {
    expect(paginate([1, 2, 3], { page: 2, pageSize: 2 })).toEqual({
      items: [3],
      page: 2,
      pageSize: 2,
      total: 3,
    });
  });
  it('rejects oversized, negative and fractional pages', () => {
    for (const query of [
      { pageSize: 101 },
      { page: 0 },
      { page: 1.5 },
      { page: 10_001 },
    ])
      expect(() => paginate([], query)).toThrow('Invalid pagination');
  });
});
