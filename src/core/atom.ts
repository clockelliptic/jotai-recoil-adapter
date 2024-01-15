import { SetStateAction, WritableAtom } from "jotai";
import { atomWithReset as jotaiAtom } from "jotai/utils";

export function atom<T>(params: { key: string; default: T }) {
  return jotaiAtom(params.default) as WritableAtom<
    T,
    [SetStateAction<T>],
    unknown
  >;
}
