import { FunctionComponent, PropsWithChildren } from "react";

const RecoilBridge: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);

/**
 * Convenience adapter for Recoil's `useRecoilBridgeAcrossReactRoots_UNSTABLE` hook.
 *
 * The returned component does nothing. It merely returns a `<React.Fragment />` that wraps child components.
 */
export const useRecoilBridgeAcrossReactRoots_UNSTABLE = () => RecoilBridge;
