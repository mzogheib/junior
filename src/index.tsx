import React from "react";
import ReactDOM from "react-dom";
import { Global, css } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "App";
import reportWebVitals from "reportWebVitals";
import ThemeProvider from "components/Theme/ThemeProvider";
import AuthProvider from "components/Auth/AuthProvider";
import NewGameProvider from "components/Game/NewGame/NewGameProvider";

const globalStyles = css`
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    box-sizing: border-box;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <NewGameProvider>
          <App />
          <Global styles={globalStyles} />
        </NewGameProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
