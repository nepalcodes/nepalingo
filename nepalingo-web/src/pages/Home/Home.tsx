import React from "react";
import { useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();
  const username = location.state?.username;

  return (
    <div>
      <h1>Hello {username}, welcome to Nepalingo!</h1>
    </div>
  );
};

export default Home;
