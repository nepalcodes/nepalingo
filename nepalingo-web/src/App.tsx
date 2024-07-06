import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import User_auth from "./components/userAuth/UserAuth";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import supabase from "./components/userAuth/supabaseClient";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect to check the current session and subscribe to authentication state changes
  useEffect(() => {
    // Function to fetch the current session
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session); // Update authentication state
    };

    fetchSession(); // Initial session fetch

    // Subscribe to authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session); // Update authentication state on changes
    });

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<User_auth />} />
        {/* Protect the / route, redirect to /login if not authenticated */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
