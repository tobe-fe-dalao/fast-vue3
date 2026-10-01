import type { RequestClient } from '@fast-vue3/request';

import type {
  AboutInfo,
  BlogComment,
  BlogListResult,
  BlogPost,
  BlogQuery,
  ContactParams,
  ContactResult,
  CreateBlogCommentParams,
  CreateCheckoutParams,
  DocSection,
  FaqItem,
  FeatureItem,
  HomeInfo,
  PageQuery,
  PageResult,
  PaymentOrder,
  PricingPlan,
  ProductInfo,
} from '../types';

/** 门户站接口：内容读取公开，评论提交与结算需要登录。 */
export function createPortalApi(http: RequestClient) {
  return {
    about: () => http.get<AboutInfo>({ url: '/public/about' }),

    blog: (id: number) => http.get<BlogPost>({ url: `/public/blog/${id}` }),

    blogList: (params: BlogQuery = {}) =>
      http.get<BlogListResult>({ params, url: '/public/blog' }),

    blogComments: (id: number) =>
      http.get<BlogComment[]>({ url: `/public/blog/${id}/comments` }),

    blogCommentsPage: (id: number, params: PageQuery = {}) =>
      http.get<PageResult<BlogComment>>({
        params,
        url: `/public/blog/${id}/comments/page`,
      }),

    checkout: (data: CreateCheckoutParams) =>
      http.post<PaymentOrder>({ data, url: '/payments/checkout' }),

    contact: (data: ContactParams) =>
      http.post<ContactResult>({ data, url: '/public/contact' }),

    createBlogComment: (id: number, data: CreateBlogCommentParams) =>
      http.post<BlogComment>({ data, url: `/blog/${id}/comments` }),

    docs: () => http.get<DocSection[]>({ url: '/public/docs' }),

    faq: () => http.get<FaqItem[]>({ url: '/public/faq' }),

    features: () => http.get<FeatureItem[]>({ url: '/public/features' }),

    home: () => http.get<HomeInfo>({ url: '/public/home' }),

    pricing: () => http.get<PricingPlan[]>({ url: '/public/pricing' }),

    product: () => http.get<ProductInfo>({ url: '/public/product' }),
  };
}
