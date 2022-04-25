import React from "react";
import Typography from "@mui/material/Typography";

type Props = {
  firstName?: string;
};

const UserWelcome = ({ firstName = "friend" }: Props) => {
  const variant = firstName.length < 10 ? "h5" : "h6";

  return <Typography variant={variant}>Hi {firstName} 👋</Typography>;
};

export default UserWelcome;
