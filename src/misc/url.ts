import { Paths } from "pages/PageRouter";

/**
 * Base path on GitHub Pages.
 */
const BASE_PATH = "/junior";

export const getQueryParams = () => {
  const urlSearchParams = new URLSearchParams(
    window.location.hash.split("?")[1]
  );

  return Object.fromEntries(urlSearchParams);
};

export const makeSearchString = (params: Record<string, string>) => {
  const urlSearchParams = new URLSearchParams(params);
  const searchstring = urlSearchParams.toString();

  return searchstring;
};

export const setQueryParams = (params: Record<string, string>) => {
  const searchstring = makeSearchString(params);

  const { pathname } = window.location;
  const newUrl = searchstring ? `${pathname}?${searchstring}` : pathname;

  window.history.pushState(undefined, "", newUrl);
};

export const makeUrl = (
  pathname: Paths,
  searchParams?: Record<string, string>
) => {
  const { origin } = window.location;

  const searchString = searchParams ? `?${makeSearchString(searchParams)}` : "";

  return `${origin}${BASE_PATH}/#${pathname}${searchString}`;
};
