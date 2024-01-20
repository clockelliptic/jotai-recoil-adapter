import { FunctionComponent } from "react";
import { DevComponentProps } from "src/__dev__/app/components/types";
import { Space, Switch } from "antd";
import { observeRender } from "src/__dev__/render-observer";
import { PerformanceTestButton } from "src/__dev__/app/components/perf-demo";

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
