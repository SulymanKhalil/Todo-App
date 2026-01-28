import { Layout, Menu, ConfigProvider, theme, Drawer } from "antd";
import {
  Link,
  useModel,
  Outlet,
  useLocation,
  useIntl,
  getLocale,
  useNavigate,
} from "@umijs/max";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;

export default function GlobalLayout() {
  const intl = useIntl();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const { initialState, setInitialState } = useModel("@@initialState");
  const user = initialState?.user || null;

  const currentLang = getLocale();
  const t = (id) => {
    try {
      return intl.formatMessage({ id });
    } catch {
      const fallbacks = {
        websiteName: "TaskFlow",
        home: "Home",
        about: "About",
        features: "Features",
      };
      return fallbacks[id] || id;
    }
  };

  useEffect(() => {
    const isRtl = currentLang === "ur" || currentLang === "ar";
    document.body.dir = isRtl ? "rtl" : "ltr";
  }, [currentLang]);

  const handleLogout = () => {
    localStorage.removeItem("user");

    setInitialState((prev) => ({
      ...prev,
      user: null,
    }));

    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      key: "/",
      label: <Link to="/">{t("home")}</Link>,
    },
    {
      key: "/about",
      label: <Link to="/about">{t("about")}</Link>,
    },
    {
      key: "/features",
      label: <Link to="/features">{t("features")}</Link>,
    },

    ...(user?.role === "admin"
      ? [
          {
            key: "/admin",
            label: <Link to="/admin">{t("admin")}</Link>,
          },
        ]
      : []),

    ...(user
      ? [
          {
            key: "/logout",
            label: (
              <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                {t("logout")}
              </span>
            ),
          },
        ]
      : [
          {
            key: "/login",
            label: <Link to="/login">{t("login")}</Link>,
          },
        ]),
  ];

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#38bdf8",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", backgroundColor: "#0f172a" }}>
        <Header
          style={{
            position: "sticky",
            top: "0",
            zIndex: "50",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            height: "80px",
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            transition: "all 0.3s ease",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              opacity: drawerVisible ? 0 : 1,
              visibility: drawerVisible ? "hidden" : "visible",
              transition: "all 0.3s ease",
              color: "#0ea5e9",
              fontWeight: "900",
              fontSize: "1.5rem",
              letterSpacing: "-0.025em",
              background: "linear-gradient(135deg, #0ea5e9, #3b82f6, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i
              className="fa-solid fa-layer-group"
              style={{ color: "#0ea5e9", fontSize: "1.25rem" }}
            ></i>
            {t("websiteName")}
          </div>

          <div
            style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}
          >
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#94a3b8",
                fontWeight: "500",
                minWidth: "300px",
                justifyContent: "flex-end",
              }}
              className="hidden md:flex"
            />
          </div>

          <div
            onClick={toggleDrawer}
            style={{
              color: "#94a3b8",
              fontSize: "1.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            className="flex md:hidden"
          >
            <i className="fa-solid fa-bars-staggered"></i>
          </div>
        </Header>

        <Drawer
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          styles={{
            body: { padding: 0 },
            header: { border: "none" },
          }}
          closable={false}
          extra={
            <div
              onClick={() => setDrawerVisible(false)}
              style={{
                color: "#f1f5f9",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              <i
                className="fa-solid fa-xmark"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </div>
          }
          width="100%"
          title={
            <div
              style={{
                color: "#f1f5f9",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "1.25rem",
              }}
            >
              <i
                className="fa-solid fa-layer-group"
                style={{ color: "#0ea5e9" }}
              ></i>
              {t("websiteName")}
            </div>
          }
        >
          <Menu
            theme="dark"
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={() => setDrawerVisible(false)}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "none",
              padding: "16px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Drawer>

        <Content>
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
