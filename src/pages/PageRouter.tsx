import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NewGamePage from "pages/NewGamePage";
import GamePage from "pages/GamePage";

const makePath = (path: string) => `/junior${path}`;

export const paths = {
  home: makePath(""),
  game: makePath("/game"),
};

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <NewGamePage />,
  },
  {
    path: paths.game,
    element: <GamePage />,
  },
]);

const PageRouter = () => <RouterProvider router={router} />;

export default PageRouter;
