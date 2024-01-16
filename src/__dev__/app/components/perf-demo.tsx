import { FunctionComponent, useEffect, useRef } from "react";
import { DevComponentProps } from "./types";
import { Button, Tooltip, message } from "antd";
import { observeRender } from "../../../__dev__/render-observer";
import { createTodo } from "../state";
import afterFrame from "afterframe";
import { MessageInstance } from "antd/es/message/interface";

const createNTodos = 25000;

// see: https://3perf.com/blog/react-monitoring/
const measureInteraction = (messageApi?: MessageInstance, message?: string) => {
  // performance.now() returns the number of ms
  // elapsed since the page was opened
  const startTimestamp = performance.now();

  return {
    end() {
      const endTimestamp = performance.now();
      const content = `${message} ${(endTimestamp - startTimestamp).toFixed(2)}ms`;
      console.log(content);
      messageApi?.info({ key: "perf-demo", content, duration: 5 });
    },
  };
};

export const PerformanceTestButton: FunctionComponent<DevComponentProps> = ({
  appId,
  useRecoilCallback,
  useRecoilValue,
  numTodosState,
  todosState,
}) => {
  observeRender("PerformanceTestButton", appId);
  const [messageApi, messageContextHolder] = message.useMessage();
  const startTime = useRef<number | null>(null);
  const numTodos = useRecoilValue(numTodosState);
  const addTodoItems = useRecoilCallback(({ set }) => () => {
    const measureTotalInteractionTime = measureInteraction(
      messageApi,
      "Total interaction time: ",
    );
    startTime.current = new Date().getTime();
    for (let i = 0; i <= createNTodos; i++) {
      set(todosState, (prev) => [...prev, createTodo()]);
    }
    afterFrame(() => {
      measureTotalInteractionTime.end();
    });
  });
  useEffect(() => {
    if (numTodos === createNTodos + 2) {
      const { current: start } = startTime;
      if (start === null) {
        console.warn("Start time is null.");
      } else {
        const end = new Date().getTime();
        const testDurationMs = end - start;
        const testDuration = `${(testDurationMs / 1000).toFixed(2)}s`;
        console.log("State update duration: " + testDuration);
        startTime.current = null;
      }
    }
  }, [numTodos]);
  return (
    <>
      {messageContextHolder}
      <Tooltip placement="bottom" title={`Create ${createNTodos} todo items.`}>
        <Button
          onMouseDown={() => {
            void messageApi.open({
              key: "perf-demo",
              type: "loading",
              content: `Creating ${createNTodos} todo items..`,
              duration: 0,
            });
          }}
          onMouseUp={() => {
            setTimeout(() => {
              console.log("Start test.");
              addTodoItems();
            }, 250);
          }}
        >
          Run Performance Demo
        </Button>
      </Tooltip>
    </>
  );
};
