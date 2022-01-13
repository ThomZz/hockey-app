import AppRouter from "./router";
import styles from "./App.module.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className={styles["app-container"]}>
      <Router>
        <Header />
        <div className={styles.content}>
          <AppRouter />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
