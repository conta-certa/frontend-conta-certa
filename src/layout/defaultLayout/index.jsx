import {
  Layout,
  Breadcrumb,
  ConfigProvider,
  Menu,
  Space,
  theme as antdTheme,
} from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import ThemeSwitcher from "../../components/themeSwitcher/ThemeSwitcher";
import { useTheme } from "../../components/themeContext";

const { Header, Content, Footer } = Layout;

const DefaultLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const { token } = antdTheme.useToken();

  const menuItems = [
    { key: "/dashboard", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "/calendar", icon: <CalendarOutlined />, label: "Calendário" },
    { key: "/profile", icon: <UserOutlined />, label: "Perfil" },
  ];

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = useMemo(() => {
    const crumbs = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const name =
        url === "/dashboard"
          ? ""
          : url === "/calendar"
          ? "Calendário"
          : url === "/profile"
          ? "Perfil"
          : url;
      return { title: name, href: url };
    });

    return crumbs.length > 0
      ? [{ title: "Home", href: "/dashboard" }, ...crumbs]
      : [{ title: "Home", href: "/dashboard" }];
  }, [location.pathname]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <Layout
        style={{
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Header
          style={{
            background: "transparent",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            justifyContent: "space-between",
            width: "393px",
            height: 64,
          }}
        >
          <Space>
            <h1>Conta Certa</h1>
          </Space>
          <ThemeSwitcher />
        </Header>

        <Breadcrumb
          style={{
            padding: "8px 16px",
            width: "393px",
          }}
          items={breadcrumbItems.map((item) => ({
            title: (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate(item.href)}
              >
                {item.title}
              </span>
            ),
          }))}
        />

        <Content
          style={{
            width: "393px",
            flex: 1,
            overflowY: "auto",
            padding: "16px",
          }}
        >
          <Outlet />
        </Content>

        <Footer
          style={{
            padding: 0,
            background: token.colorBgContainer,
            width: "393px",
            borderTop: `1px solid ${token.colorBorder}`,
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            items={menuItems}
            style={{
              display: "flex",
              justifyContent: "space-around",
              border: "none",
            }}
          />
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default DefaultLayout;
