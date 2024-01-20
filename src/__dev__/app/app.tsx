import { FunctionComponent, Suspense } from "react";
import { AppFactory } from "src/__dev__/app/components/app-factory";
import { observeRender } from "src/__dev__/render-observer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeLocalStorageData } from "src/__dev__/app/data-source/init-localstorage-data";
import { AppIdNames } from "src/__dev__/app/config";

initializeLocalStorageData();

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
    <Suspense
      fallback={
        <div
          style={{ width: "100dvw", height: "100dvh", background: "#000" }}
        />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};
