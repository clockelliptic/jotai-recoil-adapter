import { FunctionComponent, PropsWithChildren } from "react";

export const RecoilRoot: FunctionComponent<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PropsWithChildren & { [props: string]: any }
> = ({ children }) => <>{children}</>;
