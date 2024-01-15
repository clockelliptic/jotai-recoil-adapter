import { atom } from "jotai";
import { atomFamily as jotaiAtomFamily } from "jotai/utils";

export type AtomFamilyParams<T, Param> = {
  key: (param: Param) => string;
  default: T | ((param: Param) => T);
};

export function atomFamily<T extends unknown[], Param>(
  params: AtomFamilyParams<T, Param>,
) {
  return jotaiAtomFamily((param: Param) => {
    const defaultValue =
      typeof params.default === "function"
        ? params.default(param)
        : params.default;
    return atom({
      key: params.key(param),
      default: defaultValue,
    });
  });
}
