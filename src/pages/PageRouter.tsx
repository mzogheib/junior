import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import NewGamePage from "pages/NewGamePage";
import GamePage from "pages/GamePage";
import SharedGamePage from "pages/SharedGamePage";

export const paths = {
  home: "/",
  game: "/game",
  sharedGame: "/shared-game",
  customGame: "/custom-game",
} as const;

type Keys = keyof typeof paths;

export type Paths = typeof paths[Keys];

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
  {
    path: "*",
    element: <Navigate to={paths.home} />,
  },
]);

const PageRouter = () => <RouterProvider router={router} />;

export default PageRouter;
