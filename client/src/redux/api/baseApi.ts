import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./commonApi";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Product", "Order"],
  endpoints: () => ({}),
});
