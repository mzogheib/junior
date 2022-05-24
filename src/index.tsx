import React from "react";
import ReactDOM from "react-dom";

import App from "App";
import reportWebVitals from "reportWebVitals";
import ThemeProvider from "components/Theme/ThemeProvider";
import GlobalStyles from "components/Theme/GlobalStyles";
import AuthProvider from "components/Auth/AuthProvider";
import NewGameProvider from "components/Game/NewGame/NewGameProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <NewGameProvider>
          <App />
          <GlobalStyles />
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
