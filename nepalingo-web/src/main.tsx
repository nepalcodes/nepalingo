import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./components/userAuth/AuthContext";
import { StreakProvider } from "./components/StreakContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <StreakProvider>
        <App />
      </StreakProvider>
    </AuthProvider>
  </React.StrictMode>
);
