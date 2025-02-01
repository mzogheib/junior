import React from "react";
import { createRoot } from "react-dom/client";

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
