import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import NewGamePage from "pages/NewGamePage";
import GamePage from "pages/GamePage";
import GameSuccessPage from "pages/GameSuccessPage";
import CustomGamePage from "pages/CustomGamePage";

export const paths = {
  home: "/",
  game: "/game",
  gameSuccess: "/game/success",
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
    path: paths.gameSuccess,
    element: <GameSuccessPage />,
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
