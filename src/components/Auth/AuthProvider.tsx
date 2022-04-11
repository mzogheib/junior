import { FC } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import configJsonDev from "./config/dev.json";
import configJsonProd from "./config/prod.json";

const getConfig = () => {
  if (process.env.NODE_ENV === "development") {
    return configJsonDev;
  }

  return configJsonProd;
};

const config = {
  ...getConfig(),
  redirectUri: window.location.origin,
};

const AuthProvider: FC = ({ children }) => {
  return <Auth0Provider {...config}> {children}</Auth0Provider>;
};

export default AuthProvider;
