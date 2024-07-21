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
    <div className="flex flex-col w-full h-screen bg-black text-white font-primary">
      <Header />
      <div className="flex flex-col px-6 flex-grow">
        <div className="flex justify-between mt-5 text-xl font-primary font-bold">
          <GreetingCard name={user?.user_metadata?.username} />
          <StreakDisplay />
        </div>
        <div className="flex flex-row justify-center items-center mt-10 space-x-4 h-full">
          <div className="flex-1 h-full">
            <DailyQuiz />
          </div>
          <div className="flex-1 h-full">
            <ViewDictionary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
