import { RESET, useAtomCallback } from "jotai/utils";
import { Getter, Setter } from "jotai";
import { useCallback } from "react";
import { SetterAdapterParams, Snapshot } from "../core/types";
import { snapshotAdapter } from "./snapshot-adapter";

export type UseStateCallbackParams = SetterAdapterParams & {
  snapshot: Snapshot;
};

/**
 * Adapter for Recoil's standard `useRecoilCallback` hook.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRecoilCallback<T extends (...args: any[]) => ReturnType<T>>(
  callback: (params: UseStateCallbackParams) => T,
  deps?: readonly unknown[],
): (...args: Parameters<T>) => ReturnType<T> {
  const cb = useCallback(
    (get: Getter, set: Setter, ...args: Parameters<T>) => {
      const snapshot = snapshotAdapter(get);
      return callback({
        snapshot,
        get,
        set,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reset: (atom) => set(atom, RESET as any),
      })(...args);
    },
    !deps ? (undefined as unknown as readonly unknown[]) : [...deps],
  );
  return useAtomCallback(cb);
}
