import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { apiCircuitBreaker } from "@/utils/CircuitBreaker";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api", // change to your backend url
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    return await apiCircuitBreaker.execute(async () => {
      const result = await rawBaseQuery(args, api, extraOptions);
      if (result.error) {
        // Treat 5xx errors as failures for the circuit breaker
        if (typeof result.error.status === 'number' && result.error.status >= 500) {
          throw result.error;
        }
      }
      return result;
    });
  } catch (err) {
    // If it's a circuit breaker error, return a specific error format or handle gracefully
    return {
      error: {
        status: 503,
        data: { message: (err as Error).message },
      } as FetchBaseQueryError
    };
  }
};

import { encryptPayload } from "@/utils/encryption";

// Generic helpers
export const apiGet = (url: string) => ({
  url,
  method: "GET",
});

export const apiPost = <T>(url: string, body: T, options?: { encrypt?: boolean }) => {
  const finalBody = options?.encrypt ? { data: encryptPayload(body) } : body;
  return {
    url,
    method: "POST",
    body: finalBody,
  };
};

export const apiPut = <T>(url: string, body: T, options?: { encrypt?: boolean }) => {
  const finalBody = options?.encrypt ? { data: encryptPayload(body) } : body;
  return {
    url,
    method: "PUT",
    body: finalBody,
  };
};

export const apiDelete = (url: string) => ({
  url,
  method: "DELETE",
});
