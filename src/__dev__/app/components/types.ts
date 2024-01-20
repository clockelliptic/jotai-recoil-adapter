import { DevAppState } from "../state";
import { AppIdNames, JotaiStateFactoryArgs } from "../config";
export type AppIdProps = { appId: AppIdNames };
export type DevComponentProps = JotaiStateFactoryArgs &
  DevAppState &
  AppIdProps;
