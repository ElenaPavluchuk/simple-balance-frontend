export const getErrorMessage = (
  err,
  fallback = "Something went wrong. Please try again",
) => err.response?.data?.message || fallback;
