import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import User_auth from "./pages/Login";
import Home from "./pages/Home";
import FlashcardPage from "./pages/FlashcardPage"
import ReactGA from "react-ga4";
import { PrivateRoutes } from './components/PrivateRoutes';

const App: React.FC = () => {
  const TrackingID = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID;
  ReactGA.initialize(TrackingID);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<User_auth />} />
        <Route element={<PrivateRoutes/>}>
        <Route path="/" element={<Home />} />
        <Route  path="/learn" element={<FlashcardPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
