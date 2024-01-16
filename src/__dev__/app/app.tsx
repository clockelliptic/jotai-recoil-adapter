import { FunctionComponent } from "react";
import { AppFactory } from "./components/app-factory";
import { observeRender } from "../render-observer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppIdNames } from "./types";

const Home = () => <AppFactory appId={AppIdNames.jotaiRecoilAdapter} />;

const Recoil = () => <AppFactory appId={AppIdNames.recoil} />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recoil",
    element: <Recoil />,
  },
]);

export const DevAppFactory: FunctionComponent = () => {
  observeRender("DevAppFactory", "APP");
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
