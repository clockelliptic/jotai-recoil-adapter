import { atom as jotaiAtom } from "jotai";

export function atom<T>(params: { key: string; default: T }) {
  return jotaiAtom(params.default);
}
