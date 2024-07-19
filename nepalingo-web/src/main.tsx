import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "./index.css";
import { AuthProvider } from "@/hooks/Auth";
import { StreakProvider } from "@/components/StreakContext";
import { LanguageProvider } from "@/hooks/Langauge";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <StreakProvider>
          <App />
        </StreakProvider>
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>,
);
