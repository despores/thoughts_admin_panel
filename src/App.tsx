import React from "react";
import * as styles from "./app.module.scss";
import * as commonStyles from "./theme/common.module.scss";
import AppRoutes from "./routes/routes";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainContent() {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      {location.pathname === "/login" ? <></> : <Header />}
      <main className={[commonStyles.container, styles.content].join(" ")}>
        <AppRoutes />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
