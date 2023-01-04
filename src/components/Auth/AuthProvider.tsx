import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";

import configJsonDev from "components/Auth/config/dev.json";
import configJsonProd from "components/Auth/config/prod.json";
import { ChildrenProp } from "types";

const getConfig = () => {
  if (process.env.NODE_ENV === "development") {
    return configJsonDev;
  }

  return configJsonProd;
};

const config: Auth0ProviderOptions = {
  ...getConfig(),
  redirectUri: `${window.location.origin}/junior`,
};

const AuthProvider = ({ children }: ChildrenProp) => {
  return <Auth0Provider {...config}> {children}</Auth0Provider>;
};

export default AuthProvider;
