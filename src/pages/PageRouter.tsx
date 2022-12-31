import { createHashRouter, RouterProvider } from "react-router-dom";

import NewGamePage from "pages/NewGamePage";
import GamePage from "pages/GamePage";
import SharedGamePage from "pages/SharedGamePage";

export const paths = {
  home: "/",
  game: "/game",
  sharedGame: "/shared-game",
  customGame: "/custom-game",
};

const router = createHashRouter([
  {
    path: paths.home,
    element: <NewGamePage />,
  },
  {
    path: paths.game,
    element: <GamePage />,
  },
  {
    path: paths.sharedGame,
    element: <SharedGamePage />,
  },
]);

const PageRouter = () => <RouterProvider router={router} />;

export default PageRouter;
