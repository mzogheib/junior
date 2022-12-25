export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);

  return Object.fromEntries(params);
};
