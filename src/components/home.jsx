import { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker, Alert, Select } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import "dayjs/locale/ur";
import "dayjs/locale/ar";
import "dayjs/locale/zh-tw";
import arEG from "antd/es/date-picker/locale/ar_EG";
import enUS from "antd/es/date-picker/locale/en_US";
import urPK from "antd/es/date-picker/locale/ur_PK";
import zhTW from "antd/es/date-picker/locale/zh_TW";

const Home = () => {
  const [tasks, setTask] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    dayjs.locale(
      i18n.language === "ar"
        ? "ar"
        : i18n.language === "ur"
        ? "ur"
        : i18n.language === "zh-TW"
        ? "zh-tw"
        : "en"
    );
  }, [i18n.language]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const changeLang = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const handleAddTaskButton = () => {
    setModalOpen(true);
    setEditingTaskId(null);
  };

  const handleOk = () => {
    if (!taskTitle || !taskDescription || !dueDate) {
      setError(true);
      return;
    }

    if (editingTaskId === null) {
      setTask((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          title: taskTitle,
          description: taskDescription,
          dueDate,
          isCompleted: false,
        },
      ]);
    } else {
      setTask((prev) =>
        prev.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: taskTitle,
                description: taskDescription,
                dueDate,
              }
            : task
        )
      );
    }
    closeModal();
  };

  const handleDeleteTask = (id) => {
    setTask((prev) => prev.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTask((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleUpdateTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;
    setEditingTaskId(id);
    setTaskTitle(taskToEdit.title);
    setTaskDescription(taskToEdit.description);
    setDueDate(taskToEdit.dueDate);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTaskTitle("");
    setTaskDescription("");
    setDueDate(null);
    setEditingTaskId(null);
    setError(false);
  };

  return (
    <div
      dir={i18n.language === "ur" || i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-950 py-10 px-4 font-sans selection:bg-sky-500/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center sm:text-left">
          <h1
            className="
    text-3xl sm:text-4xl md:text-5xl
    font-extrabold
    text-sky-400
    sm:bg-gradient-to-r sm:from-sky-400 sm:to-indigo-500
    sm:bg-clip-text sm:text-transparent
  "
          >
            {t("websiteName")}
          </h1>
          <p className="mt-2 text-slate-400 text-lg font-medium italic">
            “{t("websiteTagline")}”
          </p>
        </div>

        <div className="mb-8 flex justify-end gap-3">
          <Button
            onClick={handleAddTaskButton}
            type="primary"
            size="large"
            className="bg-sky-500 hover:bg-sky-400 border-none shadow-lg shadow-sky-500/20 h-12 px-8 text-base font-semibold"
          >
            <i className="fa-solid fa-plus me-2"></i> {t("addTask")}
          </Button>
          <Select
            value={i18n.language}
            onChange={changeLang}
            size="large"
            className="custom-language-select w-32"
            popupClassName="custom-language-dropdown"
            options={[
              {
                value: "en",
                label: "English",
              },
              {
                value: "ur",
                label: "اُردو",
              },
              {
                value: "zh-TW",
                label: "繁體中文",
              },
              {
                value: "ar",
                label: "العربية",
              },
            ]}
          />
        </div>
        {tasks.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
            <div className="text-6xl mb-6 text-slate-800">
              <i className="fa-solid fa-clipboard-list"></i>
            </div>
            <p className="text-slate-400 text-lg">{t("noTask")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                    task.isCompleted
                      ? "bg-emerald-950/20 border-emerald-900/50 hover:border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                      : "bg-sky-950/20 border-sky-900/50 hover:border-sky-500/30 shadow-lg shadow-sky-500/5"
                  }`}
                >
                  <div
                    className={`absolute top-0 ltr:right-0 rtl:left-0 p-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex gap-2 ${
                      task.isCompleted ? "bg-emerald-950/90" : "bg-sky-950/90"
                    } ltr:rounded-bl-2xl rtl:rounded-br-2xl z-10 backdrop-blur-sm`}
                  >
                    <Button
                      onClick={() => handleDeleteTask(task.id)}
                      type="text"
                      className="text-slate-400 hover:text-red-400"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                    <Button
                      onClick={() => handleUpdateTask(task.id)}
                      type="text"
                      className="text-slate-400 hover:text-sky-400"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Button>
                    <Button
                      onClick={() => handleCompleteTask(task.id)}
                      type="text"
                      className={`${
                        task.isCompleted
                          ? "text-emerald-400 hover:text-emerald-300"
                          : "text-slate-400 hover:text-emerald-400"
                      }`}
                    >
                      <i className="fa-solid fa-check"></i>
                    </Button>
                  </div>

                  <div className="mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        task.isCompleted
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-sky-500/10 text-sky-400"
                      }`}
                    >
                      <i className="fa-solid fa-list-check text-xl"></i>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 mb-2 truncate">
                    {task.title}
                  </h3>
                  <p className="text-slate-400 mb-4 line-clamp-2 min-h-[3rem] text-sm leading-relaxed">
                    {task.description}
                  </p>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                    <p className="text-slate-500 text-sm font-mono flex items-center">
                      <i className="fa-regular fa-calendar me-2 opacity-50"></i>
                      {t("dueDate")}:
                      {dayjs(task.dueDate).format("DD MMMM YYYY")}
                    </p>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        task.isCompleted
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                      }`}
                    >
                      {task.isCompleted ? t("completed") : t("active")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Modal
          title={
            <span className="text-slate-100 font-bold text-xl">
              {editingTaskId ? t("updateTask") : t("addTask")}
            </span>
          }
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={closeModal}
          okText={editingTaskId ? t("updateTask") : t("addTask")}
          cancelText={t("cancelText")}
          width={500}
          centered
          className="custom-modal"
        >
          <div className="flex flex-col gap-5 py-4">
            {error && (
              <Alert
                message={t("required")}
                type="error"
                showIcon
                className="bg-red-500/10 border-red-500/20 text-red-200"
              />
            )}
            <div>
              <Input
                placeholder={t("taskTitle")}
                value={taskTitle}
                variant="filled"
                size="large"
                className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:bg-slate-800"
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                  setError(false);
                }}
              ></Input>
            </div>
            <div>
              <Input.TextArea
                placeholder={t("taskDescription")}
                value={taskDescription}
                variant="filled"
                rows={4}
                className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:bg-slate-800"
                onChange={(e) => {
                  setTaskDescription(e.target.value);
                  setError(false);
                }}
              ></Input.TextArea>
            </div>
            <div>
              <DatePicker
                locale={
                  i18n.language === "ar"
                    ? arEG
                    : i18n.language === "ur"
                    ? urPK
                    : i18n.language === "zh-TW"
                    ? zhTW
                    : enUS
                }
                format={"DD MMMM YYYY"}
                placeholder={t("selectDate")}
                className="w-full bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:bg-slate-800"
                variant="filled"
                size="large"
                value={dueDate ? dayjs(dueDate) : null}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
                onChange={(date) => {
                  setDueDate(date ? date.toISOString() : null);
                  setError(false);
                }}
              ></DatePicker>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
