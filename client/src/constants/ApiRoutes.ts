export const API_ROUTES = {
  // AUTH
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",

  // PRODUCTS
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id: string | number) => `/products/${id}`,

  // ORDERS
  CREATE_ORDER: "/orders",
  ORDER_BY_ID: (id: string | number) => `/orders/${id}`,
  USER_ORDERS: "/orders/user",
} as const;
