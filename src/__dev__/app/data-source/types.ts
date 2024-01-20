export interface Category {
  id: string;
  name: string;
}

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
  categoryIds: string[];
  todoListId: string;
  userId: string;
}

export interface TodoList {
  id: string;
  todoIds: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface UserSettings {
  darkmode: boolean;
  compact: boolean;
}
