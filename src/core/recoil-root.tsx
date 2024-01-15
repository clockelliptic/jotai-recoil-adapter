import React from "react";
import { Provider } from "jotai";

type RecoilRootProps = {
  children: React.ReactNode;
  r3f?: boolean;
};

export const RecoilRoot: React.FC<RecoilRootProps> = ({ children }) => {
  return <Provider>{children}</Provider>;
};
