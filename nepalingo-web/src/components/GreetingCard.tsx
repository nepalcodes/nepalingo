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
    <div className="m-2 text-center bg-black font-secondary">
      <h1 className="text-3xl font-bold leading-7 text-white">
        {`${getCurrentGreeting()} ${name},`}
      </h1>
      <p className="px-1 text-sm font-light leading-6 text- mt-2 text-white text-left">
        Lets learn some new words today!
      </p>
    </div>
  );
};

export default GreetingCard;
