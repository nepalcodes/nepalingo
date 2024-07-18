import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import User_auth from "./components/userAuth/UserAuth";
import Home from "./pages/Home/Home";
import FlashcardPage from "./pages/FlashcardPage";
import { useAuth } from "./components/userAuth/AuthContext";
import ReactGA from "react-ga4";

const App: React.FC = () => {
  const TrackingID = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID;
  ReactGA.initialize(TrackingID);
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<User_auth />} />
        <Route
          path="/flashcard"
          element={user ? <FlashcardPage /> : <Navigate to="/login" />}
        />

        {/* Protect the / route, redirect to /login if not authenticated */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
