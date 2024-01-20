import { FunctionComponent, useEffect, useRef, useState } from "react";
import { DevComponentProps } from "src/__dev__/app/components/types";
import { Button, Tooltip, message } from "antd";
import { observeRender } from "src/__dev__/render-observer";
import { createTodo } from "src/__dev__/app/state";
import { MessageInstance } from "antd/es/message/interface";

const createNTodos = 2000;

// see: https://3perf.com/blog/react-monitoring/
export const measureInteraction = (
  messageApi?: MessageInstance,
  message?: string,
) => {
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

export const PerfDemoMutationObserver: FunctionComponent<DevComponentProps> = ({
  appId,
  useRecoilCallback,
  useRecoilValue,
  numTodosState,
  todosState,
}) => {
  observeRender("PerformanceMutationObserver", appId);
  const [messageApi, messageContextHolder] = message.useMessage();
  const startTime = useRef<number | null>(null);
  const numTodos = useRecoilValue(numTodosState);
  // const addTodoItems = useRecoilCallback(({ set }) => () => {
  //   const measureTotalInteractionTime = measureInteraction(
  //     messageApi,
  //     "Total interaction time: ",
  //   );
  //   startTime.current = new Date().getTime();
  //   console.log(() => set(todosState, (prev) => [createTodo(), ...prev]));
  //   // for (let i = 0; i <= createNTodos; i++) {
  //   //   console.log("set...");
  //   //   set(todosState, (prev) => [...prev, createTodo()]);
  //   // }
  //   afterFrame(() => {
  //     measureTotalInteractionTime.end();
  //   });
  // });
  const addTodoItem = useRecoilCallback(({ set }) => () => {
    set(todosState, (prev) => [createTodo(), ...prev]);
  });
  const runTest = useRef(false);
  useEffect(() => {
    if (numTodos < createNTodos && runTest.current) {
      setTimeout(() => {
        addTodoItem();
      });
    } else if (runTest.current) {
      runTest.current = false;
      const { current: start } = startTime;
      if (start === null) {
        console.warn("Start time is null.");
      } else {
        const end = new Date().getTime();
        const testDurationMs = end - start;
        const testDuration = `${(testDurationMs / 1000).toFixed(2)}s`;
        const content = `Total interaction time: ${testDuration}`;
        setTimeout(() => {
          void messageApi.info({ key: "perf-demo", content, duration: 5 });
        }, 500);
        startTime.current = null;
      }
    }
  }, [numTodos]);
  return (
    <>
      {messageContextHolder}
      <span
        id="perf-test-trigger"
        onClick={() => {
          void messageApi.open({
            key: "perf-demo",
            type: "loading",
            content: `Creating ${createNTodos} todo items..`,
            duration: 0,
          });
          console.log("click trigger");
          setTimeout(() => {
            runTest.current = true;
            startTime.current = new Date().getTime();
            addTodoItem();
          }, 500);
        }}
      ></span>
    </>
  );
};
export const PerfDemoEffect: FunctionComponent<DevComponentProps> = (props) => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMount(true);
    }, 500);
  }, []);
  if (mount) {
    return <PerfDemoMutationObserver {...props} />;
  }
  return null;
};

export const PerformanceTestButton: FunctionComponent<DevComponentProps> = (
  props,
) => {
  const { appId } = props;
  observeRender("PerformanceTestButton", appId);
  return (
    <>
      <Tooltip placement="bottom" title={`Create ${createNTodos} todo items.`}>
        <Button
          onClick={() => {
            console.log("Start test.");
            document.getElementById("perf-test-trigger")?.click?.();
          }}
        >
          Run Performance Demo
        </Button>
      </Tooltip>
    </>
  );
};
