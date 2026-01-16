# TaskFlow - Modern To-Do Application

TaskFlow is a sleek, modern, and responsive To-Do application built with React and Vite. It helps you organize your daily tasks efficiently with a premium user interface and multi-language support.

## ✨ Features

- **Create, Read, Update, Delete (CRUD)**: Manage your tasks effortlessly.
- **Task Status**: Mark tasks as active or completed.
- **Persist Data**: All tasks and language preferences are saved in your browser's Local Storage.
- **Internationalization (i18n)**: Full support for multiple languages:
  - 🇺🇸 English
  - 🇵🇰 Urdu (اُردو)
  - 🇸🇦 Arabic (العربية) - RTL Support
  - 🇹🇼 Traditional Chinese (繁體中文)
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile devices.
- **Modern UI**: Styled with Tailwind CSS v4 and Ant Design for a polished look.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI Component Library**: [Ant Design (antd)](https://ant.design/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: FontAwesome & Ant Design Icons
- **Date Handling**: [Day.js](https://day.js.org/)
- **Internationalization**: [react-i18next](https://react.i18next.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Todo-App
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/      # React components (e.g., Home.jsx)
├── locales/         # Translation JSON files (en, ur, ar, wh-tw)
├── App.jsx          # Main application wrapper
├── main.jsx         # Entry point
├── i18n.js          # Internationalization configuration
└── index.css        # Global styles & Tailwind imports
```

---

Made with ❤️ using React & Tailwind CSS.
