import { baseApi } from "./baseApi";
import { apiGet, apiPost } from "./commonApi";
import { API_ROUTES } from "@/constants/ApiRoutes";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => apiGet(API_ROUTES.PRODUCTS),
    }),

    createOrder: builder.mutation<any, any>({
      query: (body) =>
        apiPost(API_ROUTES.CREATE_ORDER, body),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateOrderMutation,
} = productApi;
