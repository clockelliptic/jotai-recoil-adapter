import { FunctionComponent, Suspense } from "react";
import { observeRender } from "../../render-observer";
import { TodosContainer } from "./to-do-list";
import { AppShell } from "./app-shell";
import { Normalize as NormalizeCSS } from "styled-normalize";
import { libs } from "../config";
import { useAtomicStateFactory } from "../state";
import { AppIdProps } from "./types";

export const AppFactory: FunctionComponent<AppIdProps> = ({ appId }) => {
  const Lib = useAtomicStateFactory(appId, libs);
  const { RecoilRoot } = Lib;
  observeRender("AppContainer", appId);
  return (
    <>
      <NormalizeCSS />
      <RecoilRoot>
        <Suspense>
          <AppShell {...Lib}>
            <TodosContainer {...Lib} />
          </AppShell>
        </Suspense>
      </RecoilRoot>
    </>
  );
};
