import { DevAppState } from "src/__dev__/app/state";
import { AppIdNames, JotaiStateFactoryArgs } from "src/__dev__/app/config";
export type AppIdProps = { appId: AppIdNames };
export type DevComponentProps = JotaiStateFactoryArgs &
  DevAppState &
  AppIdProps;
