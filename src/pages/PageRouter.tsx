import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import NewGamePage from "pages/NewGamePage";
import GamePage from "pages/GamePage";
import CustomGamePage from "pages/CustomGamePage";

export const paths = {
  home: "/",
  game: "/game",
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
    path: paths.customGame,
    element: <CustomGamePage />,
  },
  {
    path: "*",
    element: <Navigate to={paths.home} />,
  },
]);

const PageRouter = () => <RouterProvider router={router} />;

export default PageRouter;
