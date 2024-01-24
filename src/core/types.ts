import { SetStateAction, WritableAtom } from "jotai";

type TODO = "UNSUPPOERED/TODO";
type UNSUPPORTED = "CANNOT_BE_SUPPORTED";
type Primitive = void | null | boolean | number | string;
interface HasToJSON {
  toJSON(): Parameter;
}
export type Parameter =
  | Primitive
  | HasToJSON
  | ReadonlyArray<Parameter>
  | Readonly<{ [key: string]: Parameter }>
  | ReadonlySet<Parameter>
  | ReadonlyMap<Parameter, Parameter>;

/*********************************
 * – Common Adapter Params
 */

export type AtomAdapter<T> = WritableAtom<T, [SetStateAction<T>], unknown>;

export type RecoilCommonParams = {
  key: string;
  dangerouslyAllowMutability?: TODO;
};

export type EffectArgs<T> = {
  onSet: (cb: (newVal: T, oldVal?: T) => void) => void;
  getPromise?: GetPromise;
  getLoadable?: GetLoadable;
  node?: AtomAdapter<T>;
  setSelf?: (value: T) => void;
  resetSelf?: UNSUPPORTED;
  storeID?: UNSUPPORTED;
  trigger?: UNSUPPORTED;
  getInfo_UNSTABLE?: UNSUPPORTED;
  parentStoreID_UNSTABLE?: UNSUPPORTED;
};

export type EffectFn<T> = (arg: EffectArgs<T>) => void;

/*********************************
 * – atom
 */

export type AtomAdapterParams<T> = RecoilCommonParams & {
  default: T;
  effects?: EffectFn<T>[];
};

export type AtomAsyncAdapterParams<T, U> = RecoilCommonParams & {
  default: Promise<T>;
  effects?: EffectFn<T | U>[];
  fallback?: U;
};

/*********************************
 * – atomFamily
 */

export type GetAtomFamilyDefaultValue<T, Param extends Parameter> = (
  param: Param,
) => T;

export type AtomFamilyAdapterParams<
  T,
  Param extends Parameter,
> = RecoilCommonParams & {
  default: T | GetAtomFamilyDefaultValue<T, Param>;
  effects?: (param: Param) => EffectFn<T>[];
};

export type GetAtomFamilyAsyncDefaultValue<T, Param> = (
  param: Param,
) => Promise<T>;

export type AtomFamilyAsyncAdapterParams<
  T,
  Param extends Parameter,
  U,
> = RecoilCommonParams & {
  default: Promise<T> | GetAtomFamilyAsyncDefaultValue<T, Param>;
  effects?: (param: Param) => EffectFn<T | U>[];
  fallback?: U;
};

/*********************************
 * – selector
 */
export type SelectorAdapterCommonParams<T> = RecoilCommonParams & {
  get: GetterAdapterSelector<T>;
  cachePolicy_UNSTABLE?: UNSUPPORTED;
};

export type SelectorAdapterParams<T> = SelectorAdapterCommonParams<T> & {
  set?: SetterAdapterSelector<T>;
};

export type SelectorDefaultAdapterParams<T> = SelectorAdapterCommonParams<T> & {
  set?: TODO;
};

export type AsyncSelectorAdapterParams<T, U> = SelectorAdapterCommonParams<
  Promise<T | U>
> & {
  set?: SetterAdapterSelector<T | U>;
  fallback: U;
};

/*********************************
 * – selectorFamily
 */

export type SelectorFamilyAdapterParams<
  T,
  Param extends Parameter,
> = RecoilCommonParams & {
  get: GetterAdapterSelectorFamily<Param, T>;
  set?: SetterAdapterSelectorFamily<Param, T>;
  cachePolicy_UNSTABLE?: UNSUPPORTED;
};

export type SelectorDefaultFamilyAdapterParams<
  T,
  Param extends Parameter,
> = RecoilCommonParams & {
  get: GetterAdapterSelectorFamily<Param, T>;
  set?: TODO;
  cachePolicy_UNSTABLE?: UNSUPPORTED;
};

export type AsyncSelectorFamilyAdapterParams<
  T,
  Param extends Parameter,
  U,
> = RecoilCommonParams & {
  get: GetterAdapterSelectorFamily<Param, Promise<T>>;
  set?: SetterAdapterSelectorFamily<Param, T | U>;
  fallback: U;
  cachePolicy_UNSTABLE?: UNSUPPORTED;
};

/*********************************
 * – (selector) Getter, Setter
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

export type GetterAdapterSelectorFamily<Param extends Parameter, T> = (
  param: Param,
) => GetterAdapterSelector<T>;

export type SetterAdapterSelectorFamily<Param extends Parameter, T> = (
  param: Param,
) => SetterAdapterSelector<T>;

/**
 * – Snapshot, Loadable
 */

export type Loadable<T> =
  | { state: "hasValue"; contents: T }
  | { state: "hasError"; contents: Error }
  | { state: "loading" };

export type GetPromise = <T>(atom: AtomAdapter<T>) => Promise<T>;
export type GetLoadable = <T>(atom: AtomAdapter<T>) => Loadable<T>;

export type Snapshot = {
  getPromise: GetPromise;
  retain: () => () => void;
  getLoadable: GetLoadable;
};
