import React from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import { useAuth } from "@/hooks/Auth";
import Header from "@/components/header/Header";
import GreetingCard from "@/components/GreetingCard";
import ActivityCard from "@/components/ActivityCard";
import { useLanguage } from "@/hooks/Langauge";
import StreakDisplay from "@/components/header/StreakDisplay";
import RandomQuoteComponent from "@/components/randomQuotes";

const Home: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "home",
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedLanguage } = useLanguage();

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-black text-white font-primary">
        <Header />
        <div className="flex flex-col px-6 flex-grow">
          <div className="flex justify-between mt-5 text-xl font-primary font-bold">
            <GreetingCard name={user?.user_metadata?.username} />
            <StreakDisplay />
          </div>
          <div className="mb-5 pt-5">
            <ActivityCard
              backgroundImageUrl="/CardOverlay.jpg"
              quizYourselfText="QUIZ YOURSELF"
              descriptionText=" Taking Quiz is a better and fun way for learning"
              buttonText="Start Quiz"
              onClick={() => {
                navigate("/flashcard");
              }}
            />
          </div>

          <div className="mb-5 pt-5">
            <ActivityCard
              backgroundImageUrl="/CardOverlay.jpg"
              quizYourselfText="View Dictionary"
              descriptionText={`Search for word meanings in our english to ${selectedLanguage} dicitonary!`}
              buttonText="Go to Dictionary"
              onClick={() => {
                navigate("/dictionary");
              }}
            />
          </div>

          <div className="mb-5 pt-5">
            <ActivityCard
              backgroundImageUrl="/CardOverlayBlur.png"
              quizYourselfText="Random Quote!"
              descriptionText={`Here's a random quote!`}
            >
              <div className="flex justify-center">
                <RandomQuoteComponent />
              </div>
            </ActivityCard>
          </div>
        </div>
        <div className="mb-5 pt-5">
          <ActivityCard
            backgroundImageUrl="/CardOverlay.jpg"
            quizYourselfText="Test yourself"
            descriptionText={`Try some multiple choice questions to test your ${selectedLanguage} vocabulary`}
            buttonText="Test Yourself"
            onClick={() => {
              navigate("/test-yourself");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
