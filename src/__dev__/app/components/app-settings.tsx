import { FunctionComponent } from "react";
import { DevComponentProps } from "./types";
import { Space, Switch } from "antd";
import { observeRender } from "../../../__dev__/render-observer";
import { PerformanceTestButton } from "./perf-demo";

export const AppSettings: FunctionComponent<DevComponentProps> = (props) => {
  const { appId, useRecoilState, appThemeColorState } = props;
  observeRender("AppSettings", appId);
  const [theme, setTheme] = useRecoilState(appThemeColorState);
  return (
    <Space direction="horizontal">
      <PerformanceTestButton {...props} />
      <Switch
        value={theme === "dark"}
        onChange={() => {
          setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        }}
      />
    </Space>
  );
};
