import React from "react";
import { createRoot } from "react-dom/client";

import * as serviceWorkerRegistration from "serviceWorkerRegistration";

import reportWebVitals from "reportWebVitals";
import ThemeProvider from "components/Theme/ThemeProvider";
import GlobalStyles from "components/Theme/GlobalStyles";
import PageRouter from "pages/PageRouter";

const container = document.getElementById("root");

if (container === null) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <PageRouter />
      <GlobalStyles />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
