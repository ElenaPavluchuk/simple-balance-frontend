export const API_PATHS = {
  AUTH: {
    REGISTRATION: "/api/auth/registration",
    LOGIN: "/api/auth/login",
  },
  USERS: {
    USER_PROFILE: "/api/users/profile",
    GET_NEWS: "/api/users/news",
    GET_EXCHANGE_RATES: "/api/users/rates",
  },
  ADMINS: {
    GET_ALL_USERS: "/api/admins/users",
    DELETE_USER: (userId) => `/api/admins/users/${userId}`,
    ADD_NEWS: "/api/admins/news",
    NEWS_BY_ID: (id) => `/api/admins/news/${id}`,
  },
  TRANSACTIONS: {
    ADD_TRANSACTION: "/api/transactions",
    GET_TRANSACTIONS_BY_TYPE: (type) => `/api/transactions?type=${type}`,
    TRANSACTIONS_BY_ID: (id) => `/api/transactions/${id}`,
    DASHBOARD: "/api/transactions/dashboard",
    GET_CATEGORIES_BY_TYPE: (type) =>
      `/api/transactions/categories?type=${type}`,
  },
  CURRENCIES: {
    GET_CURRENCIES: "/api/currencies",
  },
};
