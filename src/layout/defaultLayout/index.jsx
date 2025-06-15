import {
  Layout,
  Breadcrumb,
  ConfigProvider,
  Dropdown,
  Space,
  theme as antdTheme,
  Menu,
} from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  AppstoreOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { useTheme } from "../../components/themeContext";
import logoSmall from "../../assets/logoLightThemeSmall.png"

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

  const dropdownMenu = (
    <Menu
      onClick={({ key }) => navigate(key)}
      selectedKeys={[location.pathname]}
      items={menuItems}
    />
  );

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
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: "transparent",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            justifyContent: "space-between",
          }}
        >
          <Space>
            <img style={{width:"40px", height:"40px"}} src={logoSmall} alt="" />
            <Dropdown overlay={dropdownMenu} trigger={["click"]}>
              <a
                onClick={(e) => e.preventDefault()}
                style={{ color: token.colorText }}
              >
                {/* Ícone do App */}
                <AppstoreOutlined
                  style={{
                    fontSize: 24,
                  }}
                />
              </a>
            </Dropdown>
          </Space>

          <ThemeSwitcher />
        </Header>

        <Breadcrumb
          style={{
            padding: "8px 16px",
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

        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DefaultLayout;
