import { Layout, Menu, ConfigProvider, theme, Drawer } from "antd";
import { Link, Outlet, useLocation } from "@umijs/max";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;

export default function GlobalLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Ensure layout direction matches language
  useEffect(() => {
    document.body.dir =
      i18n.language === "ur" || i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const menuItems = [
    {
      key: "/",
      label: <Link to="/">{t("home")}</Link>,
    },
    {
      key: "/features",
      label: <Link to="/features">{t("features")}</Link>,
    },
    {
      key: "/about",
      label: <Link to="/about">{t("about")}</Link>,
    },
  ];

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#38bdf8", // sky-400
        },
      }}
    >
      <Layout className="min-h-screen bg-slate-950">
        <Header className="sticky top-0 z-50 w-full flex items-center justify-between px-8 sm:px-16 h-20 modern-navbar">
          <div className="text-sky-400 font-black text-2xl tracking-tighter bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 hover:opacity-85 cursor-pointer flex items-center gap-2">
            <i className="fa-solid fa-layer-group text-sky-500 text-xl"></i>
            {t("websiteName")}
          </div>

          <div className="flex-grow flex justify-end">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              className="modern-menu hidden md:flex min-w-[300px] justify-end"
            />
          </div>

          <div
            onClick={toggleDrawer}
            className="md:hidden text-slate-400 text-2xl hover:text-sky-400 cursor-pointer transition-all duration-300 active:scale-95"
          >
            <i className="fa-solid fa-bars-staggered"></i>
          </div>
        </Header>

        <Drawer
          title={
            <div className="text-sky-400 font-bold flex items-center gap-2">
              <i className="fa-solid fa-layer-group"></i>
              {t("websiteName")}
            </div>
          }
          placement={
            i18n.language === "ur" || i18n.language === "ar" ? "left" : "right"
          }
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          className="modern-drawer"
          styles={{
            body: { backgroundColor: "#020617", padding: 0 },
            header: {
              backgroundColor: "#020617",
              borderBottom: "1px solid #1e293b",
            },
          }}
          closeIcon={<i className="fa-solid fa-xmark text-slate-400"></i>}
        >
          <Menu
            theme="dark"
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={() => setDrawerVisible(false)}
            className="modern-menu-vertical bg-transparent border-none py-4"
          />
        </Drawer>

        <Content>
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
