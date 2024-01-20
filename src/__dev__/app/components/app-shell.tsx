import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DevComponentProps } from "./types";
import { observeRender } from "../../../__dev__/render-observer";
import { AppSettings } from "./app-settings";

const { darkAlgorithm, defaultAlgorithm, compactAlgorithm } = theme;
const { Header, Content } = Layout;

const navigation = [
  { label: "Jotai Adapter", key: "/" },
  { label: "Recoil Parity", key: "/recoil" },
  { label: "Jotai Pure", key: "/jotai-pure" },
  { label: "Recoil Pure", key: "/recoil-pure" },
];

const useThemeSettings = ({
  appId,
  appThemeColorState,
  appThemeCompactState,
  useRecoilValue,
}: DevComponentProps) => {
  const isDarkMode = useRecoilValue(appThemeColorState) === "dark";
  const isCompactTheme = useRecoilValue(appThemeCompactState) === "compact";
  return useMemo(() => {
    const algorithm = [isDarkMode ? darkAlgorithm : defaultAlgorithm];
    if (isCompactTheme) {
      algorithm.push(compactAlgorithm);
    }
    const components = {
      Layout: {
        headerBg: isDarkMode ? "141414" : "white",
      },
    };
    const custom = {
      layoutBorder: isDarkMode
        ? "1px solid rgba(253, 253, 253, 0.12)"
        : "1px solid rgba(5, 5, 5, 0.06)",
    };
    return { algorithm, components, custom };
  }, [isDarkMode, isCompactTheme, appId]);
};

export const AppShell: FunctionComponent<
  DevComponentProps & PropsWithChildren
> = (props) => {
  const { appId, children } = props;
  observeRender("AppShell", appId);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };
  const {
    custom: { layoutBorder },
    ...themeSettings
  } = useThemeSettings(props);
  return (
    <ConfigProvider theme={themeSettings}>
      <Layout style={{ minHeight: "100dvh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: layoutBorder,
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["Jotai"]}
            items={navigation}
            style={{ flex: 1, minWidth: 0, border: 0, background: "none" }}
            onClick={handleMenuClick}
          />
          <AppSettings {...props} />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App ({appId})</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
              border: layoutBorder,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
