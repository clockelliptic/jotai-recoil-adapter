import {
  RecoilRoot as RecoilRoot_Recoil,
  atom as atom_Recoil,
  atomFamily as atomFamily_Recoil,
  selector as selector_Recoil,
  selectorFamily as selectorFamily_Recoil,
  useRecoilCallback as useRecoilCallback_Recoil,
  useRecoilState as useRecoilState_Recoil,
  useRecoilValue as useRecoilValue_Recoil,
  useSetRecoilState as useSetRecoilState_Recoil,
  useResetRecoilState as useResetRecoilState_Recoil,
  useRecoilBridgeAcrossReactRoots_UNSTABLE as useRecoilBridgeAcrossReactRoots_UNSTABLE_Recoil,
  waitForAll as waitForAll_Recoil,
} from "recoil";
import * as jotaiRecoilAdapter from "../..";

const recoilLib = {
  RecoilRoot: RecoilRoot_Recoil,
  atom: atom_Recoil,
  atomAsync: atom_Recoil,
  atomFamily: atomFamily_Recoil,
  atomFamilyAsync: atomFamily_Recoil,
  selector: selector_Recoil,
  selectorDefault: selector_Recoil,
  asyncSelector: selector_Recoil,
  selectorFamily: selectorFamily_Recoil,
  asyncSelectorFamily: selectorFamily_Recoil,
  useRecoilCallback: useRecoilCallback_Recoil,
  useRecoilState: useRecoilState_Recoil,
  useRecoilValue: useRecoilValue_Recoil,
  useSetRecoilState: useSetRecoilState_Recoil,
  useResetRecoilState: useResetRecoilState_Recoil,
  useRecoilBridgeAcrossReactRoots_UNSTABLE:
    useRecoilBridgeAcrossReactRoots_UNSTABLE_Recoil,
  waitForAll: waitForAll_Recoil,
};

export enum AppIdNames {
  jotaiRecoilAdapter = "JotaiRecoilAdapter",
  recoil = "Recoil",
}

export const libs: StateFactoryArgs = {
  [AppIdNames.recoil]: recoilLib,
  [AppIdNames.jotaiRecoilAdapter]: jotaiRecoilAdapter,
};

export type RecoilStateFactoryArgs = typeof recoilLib;
export type JotaiStateFactoryArgs = typeof jotaiRecoilAdapter;
export interface StateFactoryArgs {
  [AppIdNames.recoil]: RecoilStateFactoryArgs;
  [AppIdNames.jotaiRecoilAdapter]: JotaiStateFactoryArgs;
}
export interface StateFactoryArgs {
  [AppIdNames.recoil]: RecoilStateFactoryArgs;
  [AppIdNames.jotaiRecoilAdapter]: JotaiStateFactoryArgs;
}
