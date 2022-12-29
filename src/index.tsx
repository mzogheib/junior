import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as serviceWorkerRegistration from "serviceWorkerRegistration";

import App from "App";
import reportWebVitals from "reportWebVitals";
import ThemeProvider from "components/Theme/ThemeProvider";
import GlobalStyles from "components/Theme/GlobalStyles";
import AuthProvider from "components/Auth/AuthProvider";
import NewGameProvider from "components/Game/NewGame/NewGameProvider";

const container = document.getElementById("root");

const makePath = (path: string) => `/junior${path}`;
const router = createBrowserRouter([
  {
    path: makePath(""),
    element: <App />,
  },
]);

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <NewGameProvider>
            <RouterProvider router={router} />
            <GlobalStyles />
          </NewGameProvider>
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
