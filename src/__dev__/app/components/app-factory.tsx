import { FunctionComponent, Suspense } from "react";
import { observeRender } from "src/__dev__/render-observer";
import { TodosContainer } from "src/__dev__/app/components/to-do-list";
import { AppShell } from "src/__dev__/app/components/app-shell";
import { libs } from "src/__dev__/app/config";
import { useAtomicStateFactory } from "src/__dev__/app/state";
import { AppIdProps } from "src/__dev__/app/components/types";
import { Global, css } from "@emotion/react";
import emotionNormalize from "emotion-normalize";
import { PerfDemoEffect } from "src/__dev__/app/components/perf-demo";

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
        <Suspense
          fallback={
            <div
              style={{ width: "100dvw", height: "100dvh", background: "#000" }}
            />
          }
        >
          <AppShell {...Lib}>
            <TodosContainer {...Lib} />
            <PerfDemoEffect {...Lib} />
          </AppShell>
        </Suspense>
      </RecoilRoot>
    </>
  );
};
