import { Row, Col, Card, List, Typography, Space } from "antd";
import { gray } from "@ant-design/colors";
import { FunctionComponent } from "react";
import { DevComponentProps } from "src/__dev__/app/components/types";
import { observeRender } from "src/__dev__/render-observer";
import { AddTodoForm } from "src/__dev__/app/components/to-do-form";
import { TodoItem } from "src/__dev__/app/components/to-do-item";

export const TodosContainer: FunctionComponent<DevComponentProps> = (props) => {
  const { appId, useRecoilValue, todosState } = props;
  observeRender("TodosContainer", appId);
  const todos = useRecoilValue(todosState);

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 20]}
      className="todos-container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Space
          direction="horizontal"
          align="center"
          style={{ padding: "0 1rem" }}
        >
          <Typography.Title level={4} style={{ margin: "0 0.5rem 0 0" }}>
            Add Todo
          </Typography.Title>
          <Typography.Text style={{ color: gray[1] }}>
            To add a todo, just fill the form below and click in add todo.
          </Typography.Text>
        </Space>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Create a new todo">
          <AddTodoForm {...props} />
        </Card>
      </Col>
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Todo List">
          <List
            id="todos-list"
            locale={{
              emptyText: "There's nothing to do :(",
            }}
            dataSource={todos}
            renderItem={(todo) => <TodoItem {...props} todo={todo} />}
            pagination={{
              position: "bottom",
              pageSize: 10,
              pageSizeOptions: [10, 20, 50, 100, 1000, 10000, 100000, 250000],
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};
