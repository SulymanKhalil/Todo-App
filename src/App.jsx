import { ConfigProvider, theme } from "antd";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./index.css";

const ThemeWrapper = ({ children }) => {
  // Use the instance directly since this component is the one providing it
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
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeWrapper>{container}</ThemeWrapper>
    </I18nextProvider>
  );
}
