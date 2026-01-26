import { ConfigProvider, theme } from "antd";
import { getLocale } from "@umijs/max"; 
import "./index.css";

const ThemeWrapper = ({ children }) => {
  const currentLang = getLocale();

  const direction =
    currentLang === "ar" || currentLang === "ur" ? "rtl" : "ltr";

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