import Typography from "@mui/material/Typography";

const BuildNumber = () => (
  <Typography align="center" color="GrayText">
    <code>build {process.env.REACT_APP_GIT_SHA}</code>
  </Typography>
);

export default BuildNumber;
