import React from "react";
import * as styles from "./app.module.scss";
import * as commonStyles from "./assets/styles/common.module.scss";
//import * as commonStyles from "./assets/styles/common.module.scss";
import AppRoutes from "./routes/routes";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from "./layout/Header/header";

function MainContent() {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      {location.pathname === "/login" ? <></> : <Header />}
      <main className={[commonStyles.container, styles.content].join(" ")}>
        <AppRoutes />
      </main>
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
