import React from "react";
import logo from "../../assets/logo.png";
import Header from "../../components/header/Header";
import ReactGA from "react-ga4";
import { useAuth } from "../../components/userAuth/AuthContext";
import DailyQuiz from "../../components/DailyQuiz";

const Home: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "home",
  });
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-r from-black via-gray-800 to-black text-white">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="mt-0">
          <h1 className="text-5xl font-bold text-center">
            Hello {user?.user_metadata?.username}, welcome to Nepalingo!
          </h1>
        </div>
        <div className="flex flex-col items-center mt-10">
          <div className="w-40 h-40 border-2 border-white rounded-full flex items-center justify-center">
            <img
              src={logo}
              alt="Nepalingo Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-3xl font-bold">Nepalingo</p>
          </div>
          <div className="text-center mt-2">
            <p className="text-xl">
              Learn indigenous languages of Nepal for free
            </p>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <DailyQuiz />
      </div>
    </div>
  );
};

export default Home;
