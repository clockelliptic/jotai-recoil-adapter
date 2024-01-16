import { FunctionComponent, PropsWithChildren } from "react";

const RecoilBridge: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);

export const useRecoilBridgeAcrossReactRoots_UNSTABLE = () => RecoilBridge;
