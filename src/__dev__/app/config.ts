import {
  AppIdNames,
  StateFactoryArgs,
  RecoilStateFactoryArgs,
  JotaiStateFactoryArgs,
} from "./types";
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
} from "../..";

const recoilLib: RecoilStateFactoryArgs = {
  RecoilRoot: RecoilRoot_Recoil,
  atom: atom_Recoil,
  atomAsync: atom_Recoil,
  atomFamily: atomFamily_Recoil,
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

const jotaiRecoilAdapter: JotaiStateFactoryArgs = {
  RecoilRoot: RecoilRoot_Jotai,
  atom: atom_Jotai,
  atomAsync: atomAsync_Jotai,
  atomFamily: atomFamily_Jotai,
  selector: selector_Jotai,
  selectorDefault: selectorDefault_Jotai,
  asyncSelector: asyncSelector_Jotai,
  selectorFamily: selectorFamily_Jotai,
  asyncSelectorFamily: asyncSelectorFamily_Jotai,
  useRecoilCallback: useRecoilCallback_Jotai,
  useRecoilState: useRecoilState_Jotai,
  useRecoilValue: useRecoilValue_Jotai,
  useSetRecoilState: useSetRecoilState_Jotai,
  useResetRecoilState: useResetRecoilState_Jotai,
  useRecoilBridgeAcrossReactRoots_UNSTABLE:
    useRecoilBridgeAcrossReactRoots_UNSTABLE_Jotai,
  waitForAll: waitForAll_Jotai,
};

export const libs: StateFactoryArgs = {
  [AppIdNames.recoil]: recoilLib,
  [AppIdNames.jotaiRecoilAdapter]: jotaiRecoilAdapter,
};
