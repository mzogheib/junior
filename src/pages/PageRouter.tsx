import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NewGamePage from "pages/NewGamePage";
import GamePage from "pages/GamePage";
import SharedGamePage from "pages/SharedGamePage";

const makePath = (path: string) => `/junior${path}`;

export const paths = {
  home: makePath(""),
  game: makePath("/game"),
  sharedGame: makePath("/shared-game"),
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
  {
    path: `${paths.game}/:config`,
    element: <SharedGamePage />,
  },
]);

const PageRouter = () => <RouterProvider router={router} />;

export default PageRouter;
