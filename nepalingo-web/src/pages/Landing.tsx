import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import { useAuth } from "@/hooks/Auth";
import Header from "@/components/header/Header";
import Button from "@/components/Button";
import TheBird from "@/assets/BirdLanding.svg";
import BirdBackground from "@/assets/BirdAndBackground.svg";
import background from "@/assets/background.svg";
import GreetingCard from "@/components/GreetingCard";
import ActivityCard from "@/components/ActivityCard";
import { useLanguage } from "@/hooks/Langauge";
import StreakDisplay from "@/components/header/StreakDisplay";
import RandomQuoteComponent from "@/components/randomQuotes";

const Landing: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "Landing",
  });
  const angles = [1, 2, 3, 6, 12, 45];
  const maxPositionTop = [
    10, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ];
  const maxPositionLeft = [
    10, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90,
  ];
  const textInstances = 30;

  const [texts, setTexts] = useState<
    { angle: number; top: number; left: number }[]
  >([]);

  useEffect(() => {
    const positions = new Set<string>();
    const generateUniquePosition = () => {
      let top, left;
      do {
        top = maxPositionTop[Math.floor(Math.random() * maxPositionTop.length)];
        left =
          maxPositionLeft[Math.floor(Math.random() * maxPositionLeft.length)];
      } while (positions.has(`${top}-${left}`));
      positions.add(`${top}-${left}`);
      return { top, left };
    };

    const newTexts = Array.from({ length: textInstances }).map(() => {
      const randomAng = angles[Math.floor(Math.random() * angles.length)];
      const { top, left } = generateUniquePosition();
      return { angle: randomAng, top, left };
    });

    setTexts(newTexts);
  }, []);
  return (
    <>
      <Header />
      <div className="bg-black min-h-screen flex items-center justify-between text-white">
        <div className="text-center flex flex-1 items-center justify-between">
          <div className="z-20 ">
            <h1 className="text-5xl mb-4 bg-black">Learn with us</h1>
            <button className="inline-flex bg-red-600 text-white-500 cursor-pointer items-center gap-1 rounded px-4 py-2 font-semibold hover:opacity-90">
              Proceed
            </button>
          </div>
          <div className="grid justify-items-end">
            <img
              src={BirdBackground}
              alt="TheBird"
              className="absolute top-1/3 right-0 z-10"
            />
          </div>
        </div>
        <div className="">
          {texts.map((text, index) => (
            <p
              key={index}
              className="absolute text-xl z-0"
              style={{
                transform: `rotate(${text.angle}deg)`,
                top: `${text.top}%`,
                left: `${text.left}%`,
              }}
            >
              जोजोलपा
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Landing;
