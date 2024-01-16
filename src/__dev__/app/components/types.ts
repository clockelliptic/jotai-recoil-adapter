import { DevAppState } from "../state";
import { AppIdNames, JotaiStateFactoryArgs } from "../types";
export type AppIdProps = { appId: AppIdNames };
export type DevComponentProps = JotaiStateFactoryArgs &
  DevAppState &
  AppIdProps;
