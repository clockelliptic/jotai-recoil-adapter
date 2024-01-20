import { AtomAdapter } from "src/core/types";
import { useAtom, SetStateAction, useAtomValue } from "jotai";
import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";

/**
 * Adapter for Recoil's standard `useRecoilState` hook.
 */
export function useRecoilState<T>(
  recoilState: AtomAdapter<T>,
): [T, (newValue: T | SetStateAction<T>) => void] {
  return useAtom(recoilState);
}
/**
 * Adapter for Recoil's standard `useRecoilValue` hook.
 */
export function useRecoilValue<T>(
  recoilState: AtomAdapter<T>,
): ReturnType<typeof useAtomValue<AtomAdapter<T>>> {
  return useAtomValue(recoilState);
}
/**
 * Adapter for Recoil's standard `useSetRecoilState` hook.
 */
export function useSetRecoilState<T>(
  state: AtomAdapter<T>,
): (newValue: T | ((prev: T) => T)) => void {
  return useSetAtom(state);
}
/**
 * Adapter for Recoil's standard `useResetRecoilState` hook.
 */
export function useResetRecoilState<T>(state: AtomAdapter<T>): () => void {
  const set = useSetAtom(state);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return () => set(RESET as any);
}
