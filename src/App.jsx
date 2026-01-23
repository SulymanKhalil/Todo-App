import { ConfigProvider, theme } from "antd";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./index.css";

const ThemeWrapper = ({ children }) => {
  const { i18n: translationInstance } = useTranslation();
  const direction =
    translationInstance.language === "ar" ||
    translationInstance.language === "ur"
      ? "rtl"
      : "ltr";

  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  );
};

export function rootContainer(container) {
  return <ThemeWrapper>{container}</ThemeWrapper>;
}
