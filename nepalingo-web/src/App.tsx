import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import User_auth from "./components/user_auth/User_auth";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import supabase from "./components/user_auth/supabaseClient";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const session = supabase.auth.getSession();
    setIsAuthenticated(!!session);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<User_auth />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
