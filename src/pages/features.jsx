import { useTranslation } from "react-i18next";

export default function FeaturesPage() {
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: "fa-list-check",
      titleKey: "featureAddTasksTitle",
      descKey: "featureAddTasksDesc",
    },
    {
      icon: "fa-language",
      titleKey: "featureLanguageSupportTitle",
      descKey: "featureLanguageSupportDesc",
    },
    {
      icon: "fa-clock",
      titleKey: "featureOverdueTrackingTitle",
      descKey: "featureOverdueTrackingDesc",
    },
    {
      icon: "fa-magnifying-glass",
      titleKey: "featureSearchOrganizeTitle",
      descKey: "featureSearchOrganizeDesc",
    },
  ];

  return (
    <div
      dir={i18n.language === "ur" || i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-950 px-4 py-12 font-sans selection:bg-sky-500/30"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-sky-400 mb-12 text-center sm:text-left bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          {t("featuresTitle")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-sky-500/30 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                <i className={`fa-solid ${feature.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
