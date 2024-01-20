import { v4 as uuidv4 } from "uuid";
import { Category, Todo, TodoList, UserInfo } from "./types";

// Helper function to get data from localStorage
export const getData = <T>(key: string, defaultData: T[]): T[] => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

// Helper function to set data in localStorage
export const setData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Category API
 */
export const getCategories = async (): Promise<Category[]> =>
  getData("categories", []);

export const createCategory = async (name: string): Promise<Category> => {
  const newCategory: Category = { id: uuidv4(), name };
  const categories = getData<Category>("categories", []);
  categories.push(newCategory);
  setData("categories", categories);
  return newCategory;
};

export const updateCategory = async (
  updatedCategory: Category,
): Promise<Category> => {
  let categories = getData<Category>("categories", []);
  categories = categories.map((category) =>
    category.id === updatedCategory.id ? updatedCategory : category,
  );
  setData("categories", categories);
  return updatedCategory;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  let categories = getData<Category>("categories", []);
  categories = categories.filter((category) => category.id !== categoryId);
  setData("categories", categories);
};

/**
 * Todo API
 */
export const getTodos = async (): Promise<Todo[]> => getData("todos", []);

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const newTodo: Todo = { id: uuidv4(), ...todo };
  const todos = getData<Todo>("todos", []);
  todos.push(newTodo);
  setData("todos", todos);
  return newTodo;
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  let todos = getData<Todo>("todos", []);
  todos = todos.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo,
  );
  setData("todos", todos);
  return updatedTodo;
};

export const deleteTodo = async (todoId: string): Promise<void> => {
  let todos = getData<Todo>("todos", []);
  todos = todos.filter((todo) => todo.id !== todoId);
  setData("todos", todos);
};

/**
 * Todo List API
 */
export const getTodoLists = async (): Promise<TodoList[]> =>
  getData("todoLists", []);

export const createTodoList = async (
  todoList: Omit<TodoList, "id">,
): Promise<TodoList> => {
  const newTodoList: TodoList = { id: uuidv4(), ...todoList };
  const todoLists = getData<TodoList>("todoLists", []);
  todoLists.push(newTodoList);
  setData("todoLists", todoLists);
  return newTodoList;
};

export const updateTodoList = async (
  listId: string,
  updates: Omit<TodoList, "id">,
): Promise<TodoList> => {
  const updatedTodoList = { id: listId, ...updates };
  let todoLists = getData<TodoList>("todoLists", []);
  todoLists = todoLists.map((list) =>
    list.id === updatedTodoList.id ? updatedTodoList : list,
  );
  setData("todoLists", todoLists);
  return updatedTodoList;
};

export const deleteTodoList = async (todoListId: string): Promise<void> => {
  let todoLists = getData<TodoList>("todoLists", []);
  let todos = getData<Todo>("todos", []);

  todoLists = todoLists.filter((list) => list.id !== todoListId);
  todos = todos.filter((todo) => todo.todoListId !== todoListId);

  setData("todoLists", todoLists);
  setData("todos", todos);
};

/**
 * UserInfo API
 */
export const getUserInfo = async (
  userEmail = "john@example.com",
): Promise<UserInfo | undefined> =>
  getData<UserInfo>("users", []).find((u) => u.email === userEmail);

export const createUserInfo = async (
  userInfo: Omit<UserInfo, "id">,
): Promise<UserInfo> => {
  const newUser: UserInfo = { id: uuidv4(), ...userInfo };
  const users = getData<UserInfo>("users", []);
  users.push(newUser);
  setData("users", users);
  return newUser;
};

export const updateUserInfo = async (
  userId: string,
  updates: Omit<UserInfo, "id">,
): Promise<UserInfo> => {
  const updatedUser = { ...updates, id: userId };
  let users = getData<UserInfo>("users", []);
  users = users.map((user) => (user.id === userId ? updatedUser : user));
  setData("users", users);
  return updatedUser;
};
