import React from "react";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import FlashcardPage from "@/pages/FlashcardPage";
import DictionaryPage from "@/pages/DictionaryPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactGA from "react-ga4";
import { PrivateRoutes } from "@/components/PrivateRoutes";

const App: React.FC = () => {
  const TrackingID = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID;
  ReactGA.initialize(TrackingID);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/flashcard" element={<FlashcardPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
