import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "App";

const makePath = (path: string) => `/junior${path}`;
const router = createBrowserRouter([
  {
    path: makePath(""),
    element: <App />,
  },
]);

const PageRouter = () => <RouterProvider router={router} />;

export default PageRouter;
