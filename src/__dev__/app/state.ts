/* eslint-disable prefer-const */
import { useMemo } from "react";
import {
  AppIdNames,
  JotaiStateFactoryArgs,
  StateFactoryArgs,
  Todo,
} from "./types";
import { observeRender } from "../render-observer";
import { uniqueId } from "lodash";

const initialState: Todo[] = [
  {
    name: "dummy todo",
    id: uniqueId(),
    completed: false,
  },
];

export const useAtomicStateFactory = <LibName extends keyof StateFactoryArgs>(
  libName: LibName,
  libs: StateFactoryArgs,
) => {
  observeRender("useAtomStateFactory(render)", libName);
  return useMemo(() => {
    observeRender("useAtomStateFactory(useMemo)", libName);
    const lib = libs[libName] as JotaiStateFactoryArgs;
    let {
      atom,
      atomFamily,
      selector,
      asyncSelector,
      selectorFamily,
      asyncSelectorFamily,
      waitForAll,
    } = lib;
    if (libName === AppIdNames.recoil) {
      // @ts-expect-error EXPECTED
      asyncSelector = selector;
      // @ts-expect-error EXPECTED
      asyncSelectorFamily = selectorFamily;
    }

    const appThemeColorState = atom<"dark" | "light">({
      key: uniqueId() + "__appTheme",
      default: "dark",
    });

    const appThemeCompactState = atom<"compact" | "normal">({
      key: uniqueId() + "__appTheme",
      default: "normal",
    });

    const todosAtomFam = atomFamily<Todo, string>({
      key: uniqueId() + "__todosAtomFam",
      default: {
        id: uniqueId(),
        name: "",
        completed: false,
      },
    });

    const todosState = atom({
      key: uniqueId() + "__todos",
      default: initialState,
    });

    const numTodosState = selector({
      key: uniqueId() + "__numTodos",
      get: ({ get }) => {
        const todos = get(todosState);
        return todos.filter((todo) => !todo.completed).length;
      },
    });

    const randomNumberSelector = asyncSelector({
      key: uniqueId() + "__randomNumberSelector",
      get: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Math.random();
      },
      fallback: "Crunching numbers...",
    });

    const randomIDSelectorFam = asyncSelectorFamily<
      string,
      string,
      "Fetching ID..."
    >({
      key: uniqueId() + "__randomIDSelectorFam",
      get: (param: string) => async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return !param.length ? "EMPTY" : uniqueId();
      },
      fallback: "Fetching ID...",
    });

    const allIdsAtom = waitForAll([
      randomIDSelectorFam("bob"),
      randomIDSelectorFam("alice"),
    ]);

    const composedSelectorFam = selectorFamily<string, string>({
      key: uniqueId() + "__composed-selector-fam",
      get:
        (param) =>
        ({ get }) =>
          `${get(randomIDSelectorFam(param))}`,
      set:
        (param) =>
        ({ set }, newValue) => {
          set(randomIDSelectorFam(param), newValue);
        },
    });

    return {
      appId: libName,
      appThemeColorState,
      appThemeCompactState,
      todosAtomFam,
      todosState,
      numTodosState,
      randomNumberSelector,
      randomIDSelectorFam,
      allIdsAtom,
      composedSelectorFam,
      ...lib,
    };
  }, []);
};

export type DevAppState = ReturnType<typeof useAtomicStateFactory>;
