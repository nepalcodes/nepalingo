import React from "react";
import ReactGA from "react-ga4";

interface GreetingCardProps {
  name: string;
}

const GreetingCard: React.FC<GreetingCardProps> = ({ name }) => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "home",
  });

  const getCurrentGreeting = (): string => {
    const CurrentHours = new Date().getHours();
    if (CurrentHours < 12) {
      return "Good Morning";
    } else if (CurrentHours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className=" bg-black font-secondary">
      <h1 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold leading-7 text-white">
        {`${getCurrentGreeting()} ${name},`}
      </h1>
      <p className=" text-md max-md:text-sm  font-light leading-6 mt-2 max-md:mt-1 text-white text-left">
        Lets learn some new words today!
      </p>
    </div>
  );
};

export default GreetingCard;
