import { FunctionComponent, Suspense } from "react";
import { observeRender } from "../../render-observer";
import { TodosContainer } from "./to-do-list";
import { AppShell } from "./app-shell";
import { libs } from "../config";
import { useAtomicStateFactory } from "../state";
import { AppIdProps } from "./types";
import { Global, css } from "@emotion/react";
import emotionNormalize from "emotion-normalize";

export const AppFactory: FunctionComponent<AppIdProps> = ({ appId }) => {
  const Lib = useAtomicStateFactory(appId, libs);
  const { RecoilRoot } = Lib;
  observeRender("AppContainer", appId);
  return (
    <>
      <Global
        styles={css`
          ${emotionNormalize}
          html, body {
            padding: 0;
            margin: 0;
            background: white;
            min-height: 100%;
            font-family: Helvetica, Arial, sans-serif;
          }
        `}
      />
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
