import { FunctionComponent } from "react";
import { DevComponentProps } from "./types";
import { Switch } from "antd";
import { observeRender } from "../../../__dev__/render-observer";

export const AppSettings: FunctionComponent<DevComponentProps> = ({
  appId,
  useRecoilState,
  appThemeColorState,
}) => {
  observeRender("AppSettings", appId);
  const [theme, setTheme] = useRecoilState(appThemeColorState);
  return (
    <Switch
      value={theme === "dark"}
      onChange={() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }}
    />
  );
};
