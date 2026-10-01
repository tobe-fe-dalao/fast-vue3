import type { PageQuery } from '@fast-vue3/api';

import { paginate } from '@fast-vue3/api';

import { useResponseError, useResponseSuccess } from '~/utils/response';
import { blogComments } from '~/utils/site-interactions';

export default defineEventHandler((event) => {
  try {
    const articleId = Number(getRouterParam(event, 'id'));
    return useResponseSuccess(paginate(blogComments.filter((comment) => comment.articleId === articleId), getQuery(event) as PageQuery));
  } catch {
    setResponseStatus(event, 400);
    return useResponseError('Invalid pagination', 400);
  }
});
