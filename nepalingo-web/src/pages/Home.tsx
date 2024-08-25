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
      <div className="flex flex-col w-full min-h-screen bg-black text-white font-primary">
        <Header />
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between my-6 text-xl font-primary font-bold max-sm:flex-col gap-2">
            <GreetingCard name={user?.user_metadata?.username} />
            <StreakDisplay />
          </div>

          <div className="mb-5 py-5">
            <div className="flex flex-col items-center">
              <div className="text-xl pb-1">Random Quote</div>
              <RandomQuoteComponent />
            </div>
          </div>

          <div className="mb-5 ">
            <ActivityCard
              backgroundImageUrl="/Quiz.png"
              quizYourselfText="Take a quiz!"
              descriptionText={`Try some multiple choice questions to test your ${selectedLanguage} vocabulary`}
              buttonText="Test Yourself"
              onClick={() => {
                navigate("/chapters");
              }}
            />
          </div>

          <div className="flex flex-row gap-4 w-full mb-4 ">
            <div className="flex-1">
              <ActivityCard
                backgroundImageUrl="/Learning.webp"
                quizYourselfText="Learn Words"
                descriptionText="Test yourself using our flashcards."
                buttonText="Start Flashcards"
                onClick={() => {
                  navigate("/flashcard");
                }}
              />
            </div>

            <div className="flex-1">
              <ActivityCard
                backgroundImageUrl="/Dictionary.png"
                quizYourselfText="View Dictionary"
                descriptionText={`Search for word meanings in our english to ${selectedLanguage} dicitonary!`}
                buttonText="Go to Dictionary"
                onClick={() => {
                  navigate("/dictionary");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
