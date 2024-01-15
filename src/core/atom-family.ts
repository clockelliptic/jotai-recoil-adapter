import {
  atomFamily as jotaiAtomFamily,
  atomWithReset as jotaiAtom,
} from "jotai/utils";
import deepEqual from "fast-deep-equal";

type GetDefaultValue<T, Param> = (param: Param) => T;

export type AtomFamilyParams<T, Param> = {
  key: string;
  default: T | GetDefaultValue<T, Param>;
};

export function atomFamily<T, Param>(params: AtomFamilyParams<T, Param>) {
  const stateFam = jotaiAtomFamily((param: Param) => {
    const defaultValue =
      typeof params.default === "function"
        ? (params.default as GetDefaultValue<T, Param>)(param)
        : params.default;
    return jotaiAtom(defaultValue);
  }, deepEqual);
  return stateFam;
}
