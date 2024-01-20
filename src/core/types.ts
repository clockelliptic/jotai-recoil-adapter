import { SetStateAction, WritableAtom } from "jotai";

export type AtomAdapter<T> = WritableAtom<T, [SetStateAction<T>], unknown>;

/*********************************
 * Common adapter params
 */

export type RecoilCommonParams = {
  key: string;
  dangerouslyAllowMutability?: "UNSUPPOERED";
};

/*********************************
 * Atom Adapter Params
 */

export type AtomAdapterCommonParams<T> = RecoilCommonParams & {
  default: T;
  effects?: "UNSUPPORTED";
};

export type AtomAdapterParams<T> = AtomAdapterCommonParams<T>;

export type AtomAsyncAdapterParams<T, U> = RecoilCommonParams & {
  default: Promise<T>;
  effects?: "UNSUPPORTED";
  fallback?: U;
};

export type GetAtomFamilyDefaultValue<T, Param> = (param: Param) => T;

export type AtomFamilyAdapterParams<T, Param> = AtomAdapterCommonParams<T> & {
  default: T | GetAtomFamilyDefaultValue<T, Param>;
};

export type GetAtomFamilyAsyncDefaultValue<T, Param> = (
  param: Param,
) => Promise<T>;

export type AtomFamilyAsyncAdapterParams<T, Param, U> = RecoilCommonParams & {
  default: Promise<T> | GetAtomFamilyAsyncDefaultValue<T, Param>;
  effects?: "UNSUPPORTED";
  fallback?: U;
};

/*********************************
 * Selector Adapter Params
 */

export type SelectorAdapterCommonParams<T> = RecoilCommonParams & {
  get: GetterAdapterSelector<T>;
  cachePolicy_UNSTABLE?: "UNSUPPORTED";
};

export type SelectorAdapterParams<T> = SelectorAdapterCommonParams<T> & {
  set?: SetterAdapterSelector<T>;
};

export type SelectorDefaultAdapterParams<T> = SelectorAdapterCommonParams<T> & {
  set?: "UNSUPPORTED";
};

export type AsyncSelectorAdapterParams<T, U> = SelectorAdapterCommonParams<
  Promise<T | U>
> & {
  set?: SetterAdapterSelector<T | U>;
  fallback: U;
};

export type SelectorFamilyAdapterParams<T, Param> = RecoilCommonParams & {
  get: GetterAdapterSelectorFamily<Param, T>;
  set?: SetterAdapterSelectorFamily<Param, T>;
  cachePolicy_UNSTABLE?: "UNSUPPORTED";
};

export type SelectorDefaultFamilyAdapterParams<T, Param> =
  RecoilCommonParams & {
    get: GetterAdapterSelectorFamily<Param, T>;
    set?: "UNSUPPORTED";
    cachePolicy_UNSTABLE?: "UNSUPPORTED";
  };

export type AsyncSelectorFamilyAdapterParams<T, Param, U> =
  RecoilCommonParams & {
    get: GetterAdapterSelectorFamily<Param, Promise<T>>;
    set?: SetterAdapterSelectorFamily<Param, T | U>;
    fallback: U;
    cachePolicy_UNSTABLE?: "UNSUPPORTED";
  };

/*********************************
 * Getter & Setter Adapters for Selectors
 */

export type GetterAdapterSelector<T> = ({
  get,
}: {
  get: <T>(atom: WritableAtom<T, [SetStateAction<T>], unknown>) => T;
}) => T;

export type SetterAdapterParams = {
  get: <T>(atom: WritableAtom<T, [SetStateAction<T>], void>) => T;
  set: <T>(
    atom: WritableAtom<T, [SetStateAction<T>], void>,
    update: SetStateAction<T>,
  ) => void;
  reset: <T>(atom: WritableAtom<T, [SetStateAction<T>], void>) => void;
};

export type SetterAdapterSelector<T> = (
  params: SetterAdapterParams,
  newT: SetStateAction<T>,
) => void;

export type GetterAdapterSelectorFamily<Param, T> = (
  param: Param,
) => GetterAdapterSelector<T>;

export type SetterAdapterSelectorFamily<Param, T> = (
  param: Param,
) => SetterAdapterSelector<T>;

/**
 * Snapshots & Loadables
 */

export type Loadable<T> =
  | { state: "hasValue"; contents: T }
  | { state: "hasError"; contents: Error }
  | { state: "loading" };

export type Snapshot = {
  getPromise: <Value>(
    atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
  ) => Promise<Value>;
  retain: () => () => void;
  getLoadable: <Value>(
    atom: WritableAtom<Value, [SetStateAction<Value>], unknown>,
  ) => Loadable<Value>;
};
