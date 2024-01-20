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

import {
  RecoilRoot as RecoilRoot_Jotai,
  atom as atom_Jotai,
  atomAsync as atomAsync_Jotai,
  atomFamily as atomFamily_Jotai,
  selector as selector_Jotai,
  selectorDefault as selectorDefault_Jotai,
  asyncSelector as asyncSelector_Jotai,
  selectorFamily as selectorFamily_Jotai,
  asyncSelectorFamily as asyncSelectorFamily_Jotai,
  useRecoilCallback as useRecoilCallback_Jotai,
  useRecoilState as useRecoilState_Jotai,
  useRecoilValue as useRecoilValue_Jotai,
  useSetRecoilState as useSetRecoilState_Jotai,
  useResetRecoilState as useResetRecoilState_Jotai,
  useRecoilBridgeAcrossReactRoots_UNSTABLE as useRecoilBridgeAcrossReactRoots_UNSTABLE_Jotai,
  waitForAll as waitForAll_Jotai,
} from "../../";

export enum AppIdNames {
  jotaiRecoilAdapter = "JotaiRecoilAdapter",
  recoil = "Recoil",
}

export interface RecoilStateFactoryArgs {
  RecoilRoot: typeof RecoilRoot_Recoil;
  atom: typeof atom_Recoil;
  atomAsync: typeof atom_Recoil;
  atomFamily: typeof atomFamily_Recoil;
  selector: typeof selector_Recoil;
  selectorDefault: typeof selector_Recoil;
  asyncSelector: typeof selector_Recoil;
  selectorFamily: typeof selectorFamily_Recoil;
  asyncSelectorFamily: typeof selectorFamily_Recoil;
  useRecoilCallback: typeof useRecoilCallback_Recoil;
  useRecoilState: typeof useRecoilState_Recoil;
  useRecoilValue: typeof useRecoilValue_Recoil;
  useSetRecoilState: typeof useSetRecoilState_Recoil;
  useResetRecoilState: typeof useResetRecoilState_Recoil;
  useRecoilBridgeAcrossReactRoots_UNSTABLE: typeof useRecoilBridgeAcrossReactRoots_UNSTABLE_Recoil;
  waitForAll: typeof waitForAll_Recoil;
}

export interface JotaiStateFactoryArgs {
  RecoilRoot: typeof RecoilRoot_Jotai;
  atom: typeof atom_Jotai;
  atomAsync: typeof atomAsync_Jotai;
  atomFamily: typeof atomFamily_Jotai;
  selector: typeof selector_Jotai;
  selectorDefault: typeof selectorDefault_Jotai;
  asyncSelector: typeof asyncSelector_Jotai;
  selectorFamily: typeof selectorFamily_Jotai;
  asyncSelectorFamily: typeof asyncSelectorFamily_Jotai;
  useRecoilCallback: typeof useRecoilCallback_Jotai;
  useRecoilState: typeof useRecoilState_Jotai;
  useRecoilValue: typeof useRecoilValue_Jotai;
  useSetRecoilState: typeof useSetRecoilState_Jotai;
  useResetRecoilState: typeof useResetRecoilState_Jotai;
  useRecoilBridgeAcrossReactRoots_UNSTABLE: typeof useRecoilBridgeAcrossReactRoots_UNSTABLE_Jotai;
  waitForAll: typeof waitForAll_Jotai;
}

export interface StateFactoryArgs {
  [AppIdNames.recoil]: RecoilStateFactoryArgs;
  [AppIdNames.jotaiRecoilAdapter]: JotaiStateFactoryArgs;
}
