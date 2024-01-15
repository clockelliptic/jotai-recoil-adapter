import {
  RecoilRoot,
  atom,
  atomFamily,
  selector,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import React, { ChangeEvent, MouseEvent, Suspense, useState } from "react";

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todosState = atom({
  key: "todos",
  default: initialState,
});

const numTodosState = selector({
  key: "numTodos",
  get: ({ get }) => {
    const todos = get(todosState);
    return todos.filter((todo) => !todo.completed).length;
  },
});

const fooStateFam = atomFamily<string, string>({
  key: "foo-state-fam",
  default: (param) => param,
});

const fooSelector = selector({
  key: "foo-selector",
  get: ({ get }) => get(todosState),
});

const NewTodo: React.FC = () => {
  const [todoName, setTodoName] = useState("");
  const setTodos = useSetRecoilState(todosState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const todoName = e.target.value;
    setTodoName(todoName);
  };

  const onSave = (e: MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTodos((todoList) => [
      ...todoList,
      {
        //Random Autogenerated ID
        id: Math.random().toString(32).substr(2, 9),
        name: todoName,
        completed: false,
      },
    ]);
  };

  return (
    <div>
      <input type="text" onChange={onChange} />
      <input type="button" value="Add" onClick={onSave} />
    </div>
  );
};

const NumTodos: React.FC = () => {
  const numTodos = useRecoilValue(numTodosState);
  return <div>Active todos: {numTodos}</div>;
};

export const TodoList: React.FC = () => {
  const [todos, setTodo] = useRecoilState(todosState);

  const completeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    const index = todos.findIndex((todo) => todo.id == id);
    const todoList = [...todos];
    todoList[index] = {
      ...todoList[index],
      completed: !todoList[index].completed,
    };
    setTodo(() => todoList);
  };

  const todoList = todos
    .filter((todo) => !todo.completed)
    .map((todo) => (
      <li key={todo.id}>
        {todo.name}
        <input type="checkbox" value={todo.id} onChange={completeTodo} />
      </li>
    ));
  return <ul>{todoList} </ul>;
};

export const RecoilAppComp = () => {
  const fam1 = useRecoilValue(fooStateFam("foo-1"));
  const [fam2, setFam2] = useRecoilState(fooStateFam("2"));
  const sel1 = useRecoilValue(fooSelector);

  const alertValue = useRecoilCallback(({ snapshot }) => async () => {
    alert(`${await snapshot.getPromise(fooSelector)}`);
  });
  return (
    <RecoilRoot>
      <Suspense>
        <div className="App">
          <NewTodo />
          <TodoList />
          <NumTodos />
          <br />
          {fam1}
          <br />
          <button
            onClick={() => setFam2((prev: string) => String(Number(prev) + 1))}
          >
            foo-{fam2}
          </button>
        </div>
        <br />

        <button onClick={alertValue}>
          alert selector value – {sel1.length}
        </button>
      </Suspense>
    </RecoilRoot>
  );
};
export const RecoilApp = () => {
  return (
    <RecoilRoot>
      <RecoilAppComp />
    </RecoilRoot>
  );
};