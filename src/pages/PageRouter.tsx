import { createHashRouter, RouterProvider } from "react-router-dom";

import NewGamePage from "pages/NewGamePage";
import GamePage from "pages/GamePage";
import SharedGamePage from "pages/SharedGamePage";
import CustomGamePage from "pages/CustomGamePage";

const makePath = (path: string) => `/junior${path}`;

export const paths = {
  home: makePath(""),
  game: makePath("/game"),
  customGame: makePath("/custom-game"),
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
    path: `${paths.game}/:config`,
    element: <SharedGamePage />,
  },
  {
    path: `${paths.customGame}`,
    element: <CustomGamePage />,
  },
]);

const PageRouter = () => <RouterProvider router={router} />;

export default PageRouter;
