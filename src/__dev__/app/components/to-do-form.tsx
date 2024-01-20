import { FunctionComponent } from "react";
import { DevComponentProps } from "src/__dev__/app/components/types";
import { observeRender } from "src/__dev__/render-observer";
import { Button, Col, Form, Input, Row } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { uniqueId } from "lodash";

export const AddTodoForm: FunctionComponent<DevComponentProps> = ({
  appId,
  useSetRecoilState,
  todosState,
}) => {
  observeRender("AddTodoForm", appId);
  const [form] = Form.useForm();
  const setTodos = useSetRecoilState(todosState);

  const onFinish = () => {
    setTodos((todoList) => [
      {
        //Random Autogenerated ID
        id: uniqueId(),
        name: form.getFieldValue("name"),
        completed: false,
        todoListId: "",
        categoryIds: [],
        userId: "",
      },
      ...todoList,
    ]);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={"name"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="What needs to be done?" id="todo-form-input" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block id="todo-form-submit">
            <PlusCircleFilled />
            Add todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
