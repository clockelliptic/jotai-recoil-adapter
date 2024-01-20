import { FunctionComponent, PropsWithChildren } from "react";

/**
 * Convenience adapter for Recoil's `<RecoilRoot />` component.
 *
 * This component does nothing. It merely returns a `<React.Fragment />` that wraps child components.
 */
export const RecoilRoot: FunctionComponent<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PropsWithChildren & { [props: string]: any }
> = ({ children }) => <>{children}</>;
