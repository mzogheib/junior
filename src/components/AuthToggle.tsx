import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const AuthToggle = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const Icon = isAuthenticated ? LogoutIcon : LoginIcon;
  const label = isAuthenticated ? "Logout" : "Login";
  const onClick = isAuthenticated ? logout : loginWithRedirect;
  const variant = isAuthenticated ? "outlined" : "contained";

  return (
    <Button
      onClick={() => onClick()}
      startIcon={<Icon />}
      variant={variant}
      fullWidth
    >
      {label}
    </Button>
  );
};

export default AuthToggle;
