export const getQueryParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  return Object.fromEntries(urlSearchParams);
};

export const setQueryParams = (params: Record<string, string>) => {
  const urlSearchParams = new URLSearchParams(params);
  const searchstring = urlSearchParams.toString();

  const { pathname } = window.location;
  const newUrl = searchstring ? `${pathname}?${searchstring}` : pathname;

  window.history.pushState(undefined, "", newUrl);
};
