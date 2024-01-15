import { Atom, useAtomValue } from "jotai";

export function useRecoilValue<T>(
  recoilState: Atom<T>,
): ReturnType<typeof useAtomValue<Atom<T>>> {
  return useAtomValue(recoilState);
}
