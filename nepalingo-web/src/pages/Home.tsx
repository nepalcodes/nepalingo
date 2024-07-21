import React from "react";
import logo from "@/assets/NewLogoCircular.png";
import ReactGA from "react-ga4";
import { useAuth } from "@/hooks/Auth";
import Header from "@/components/header/Header";
import GreetingCard from "@/components/GreetingCard";
import DailyQuiz from "@/components/DailyQuiz";
import ViewDictionary from "@/components/ViewDictionary";
import StreakDisplay from "@/components/header/StreakDisplay";

const Home: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "home",
  });
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full justify-between h-screen bg-black text-white font-primary">
      <Header />
      <div className="flex flex-col px-6 items-center justify-center flex-grow">
        <div className="flex items-center justify-between w-full mt-5 text-xl font-primary font-bold">
          <GreetingCard name={user?.user_metadata?.username} />
          <StreakDisplay />
        </div>

        <div className="flex flex-col items-center mt-5">
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
        <div className="mb-5 pt-5">
          <DailyQuiz />
        </div>

        <div className="mb-5 pt-5">
          <ViewDictionary />
        </div>
      </div>
    </div>
  );
};

export default Home;
