import Typography from "@mui/material/Typography";

const BuildNumber = () => (
  <Typography align="center" color="GrayText">
    <code>build {import.meta.env["VITE_APP_GIT_SHA"]}</code>
  </Typography>
);

export default BuildNumber;
("");
