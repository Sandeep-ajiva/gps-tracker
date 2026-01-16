import { baseApi } from "./baseApi";

const dummyProducts = [
  {
    id: "p1",
    name: "USDT Package",
    price: 10,
  },
  {
    id: "p2",
    name: "TRC20 Deposit",
    price: 50,
  },
  {
    id: "p3",
    name: "Premium Order",
    price: 100,
  },
];

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ DUMMY QUERY
    getProducts: builder.query<any[], void>({
      queryFn: async () => {
        return {
          data: dummyProducts,
        };
      },
      providesTags: ["Product"],
    }),

    // ✅ DUMMY MUTATION
    createOrder: builder.mutation<any, { amount: number }>({
      queryFn: async (body) => {
        return {
          data: {
            success: true,
            orderId: "ORD123456",
            amount: body.amount,
            status: "created",
          },
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateOrderMutation,
} = api;
