/* eslint-disable prefer-const */
import { useMemo } from "react";
import {
  JotaiStateFactoryArgs,
  StateFactoryArgs,
} from "src/__dev__/app/config";
import { observeRender } from "src/__dev__/render-observer";
import { uniqueId } from "lodash";
import { Todo } from "src/__dev__/app/data-source/types";
import { getTodos } from "src/__dev__/app/data-source/api";

export const createTodo = () => {
  const id = uniqueId();
  return {
    name: `To Do: ${id}`,
    id,
    completed: false,
    todoListId: "",
    categoryIds: [] as string[],
    userId: "",
  };
};

/**
 * We use this strange pattern to enforce 1:1 parity of
 * jotai-recoil-adapter APIs and Recoil APIs, for the purposes
 * of validating jotai-recoil-adapter and performing
 * apples-to-apples comparison of perf and behavior.
 */
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
      atomAsync,
      atomFamily,
      atomFamilyAsync,
      selector,
      selectorDefault,
      selectorDefaultFamily,
      asyncSelector,
      selectorFamily,
      asyncSelectorFamily,
      waitForAll,
    } = lib;

    const appThemeColorState = atom<"dark" | "light">({
      key: uniqueId() + "__appColorTheme",
      default: "dark",
    });

    const appThemeCompactState = atom<"compact" | "normal">({
      key: uniqueId() + "__appCompactnessTheme",
      default: "normal",
    });

    const todosAtomFam = atomFamily<Todo, string>({
      key: uniqueId() + "__todosAtomFam",
      default: {
        id: uniqueId(),
        name: "",
        completed: false,
        todoListId: "",
        categoryIds: [],
        userId: "",
      },
    });

    const todosState = atomAsync({
      key: uniqueId() + "__intialTodos",
      default: selectorDefault({
        key: uniqueId() + "__intialTodosSelector",
        get: async () => await getTodos(),
      }),
      fallback: [] as Todo[],
    });

    const todosState_ = atomFamilyAsync({
      key: uniqueId() + "__intialTodos_",
      default: selectorDefaultFamily({
        key: uniqueId() + "__intialTodosSelector_",
        get: (param: string) => async () => {
          console.log("atomFamilyAsync selectorDefaultFamily param", param);
          return await getTodos();
        },
      }),
      fallback: [] as Todo[],
    });

    const todosState__ = atomFamilyAsync<Todo[], string, Todo[]>({
      key: uniqueId() + "__intialTodos__",
      default: selectorDefault({
        key: uniqueId() + "__intialTodosSelector__",
        get: async () => await getTodos(),
      }),
      fallback: [] as Todo[],
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
      todosState_,
      todosState__,
      ...lib,
    };
  }, []);
};

export type DevAppState = ReturnType<typeof useAtomicStateFactory>;
