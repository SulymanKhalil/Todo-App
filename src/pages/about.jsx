import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t, i18n } = useTranslation();

  return (
    <div
      dir={i18n.language === "ur" || i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-950 px-4 py-12 font-sans selection:bg-sky-500/30"
    >
      <div className="max-w-4xl mx-auto text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-sky-400 mb-6 bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          {t("aboutTitle")}
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          {t("websiteTagline")}
        </p>
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            {t("aboutMission")}
          </h2>
          <p className="text-slate-400 leading-relaxed">
            {t("aboutMissionDesc")}
          </p>
        </div>
      </div>
    </div>
  );
}
