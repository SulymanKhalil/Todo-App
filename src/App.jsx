import { ConfigProvider, theme } from "antd";
import { useTranslation } from "react-i18next";
import "./i18n";
import "./index.css";

const ThemeWrapper = ({ children }) => {
  const { i18n } = useTranslation();
  const direction =
    i18n.language === "ar" || i18n.language === "ur" ? "rtl" : "ltr";

  return (
    <ConfigProvider
      direction={direction}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#0ea5e9",
          colorBgContainer: "#0f172a", 
          colorBgElevated: "#1f1f1f", 
          colorText: "#f1f5f9", 
          colorTextPlaceholder: "#64748b", 
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export function rootContainer(container) {
  return <ThemeWrapper>{container}</ThemeWrapper>;
}
