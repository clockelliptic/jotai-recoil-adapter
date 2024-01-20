import { FunctionComponent } from "react";
import { DevComponentProps } from "./types";
import { Button, List, Popconfirm, Switch, Tag, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Todo } from "../data-source/types";
import { observeRender } from "../../../__dev__/render-observer";

export const TodoItem: FunctionComponent<
  DevComponentProps & { todo: Todo }
> = ({ todo, appId, todosState, useSetRecoilState }) => {
  observeRender("TodoItem", appId);
  const setTodo = useSetRecoilState(todosState);
  const toggleCompleted = (todoItem: Todo) => {
    setTodo((todos) =>
      todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return { ...todoItem, completed: !todoItem.completed };
        }
        return todo;
      }),
    );
  };
  const removeItem = (todoItem: Todo) => {
    setTodo((todos) => todos.filter((todo) => todo.id !== todoItem.id));
  };
  return (
    <List.Item
      actions={[
        <Tooltip
          title={todo.completed ? "Mark as uncompleted" : "Mark as completed"}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => toggleCompleted(todo)}
            defaultChecked={todo.completed}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            removeItem(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={todo.completed ? "cyan" : "red"} className="todo-tag">
          {todo.name}
        </Tag>
      </div>
    </List.Item>
  );
};
