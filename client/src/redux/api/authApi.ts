// redux/api/authApi.ts
import { baseApi } from "./baseApi";
import { apiPost } from "./commonApi";
import { API_ROUTES } from "@/constants/ApiRoutes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (body) =>
        apiPost(API_ROUTES.LOGIN, body, { encrypt: true }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // ✅ LOGIN RESPONSE SE TOKEN UTHAO
          if (typeof window !== "undefined") {
            localStorage.setItem("token", data.token);
          }
        } catch (err) {
          console.error("Login failed");
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
