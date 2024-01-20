import { v4 as uuidv4 } from "uuid";
import { Todo, TodoList, UserInfo } from "./types";

export const initializeLocalStorageData = () => {
  // Check and initialize categories
  if (!localStorage.getItem("categories")) {
    const categories = [
      { id: uuidv4(), name: "Work" },
      { id: uuidv4(), name: "Personal" },
      { id: uuidv4(), name: "Shopping" },
      { id: uuidv4(), name: "Health" },
    ];
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  // Check and initialize todo lists
  if (!localStorage.getItem("todoLists")) {
    const todoLists = [
      { id: uuidv4(), todoIds: [] },
      { id: uuidv4(), todoIds: [] },
      { id: uuidv4(), todoIds: [] },
    ];
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  }

  // Check and initialize todos
  if (!localStorage.getItem("todos")) {
    const todoLists: TodoList[] = JSON.parse(
      localStorage.getItem("todoLists") || "[]",
    );
    const todos: Todo[] = [];

    todoLists.forEach((list) => {
      const numberOfTodos = Math.floor(Math.random() * 9) + 3; // Generate between 3 and 11 todos
      for (let i = 0; i < numberOfTodos; i++) {
        todos.push({
          id: uuidv4(),
          name: `Todo Item ${i + 1}`,
          completed: Math.random() < 0.5, // Randomly set completed status
          categoryIds: [], // Assign category IDs as needed
          todoListId: list.id,
          userId: "", // Assign user ID as needed
        });
      }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Check and initialize user info
  if (!localStorage.getItem("users")) {
    const users: UserInfo[] = [
      { id: uuidv4(), name: "John Doe", email: "john@example.com" },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }
};

export const clearLocalStorageData = () => {
  const keys = ["categories", "todoLists", "todos", "users"];

  // Iterate over each key and remove it from localStorage
  keys.forEach((key) => localStorage.removeItem(key));

  console.log("All associated localStorage data has been deleted.");
};

export const resetLocalStorageData = () => {
  clearLocalStorageData();
  initializeLocalStorageData();
};
