import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import { useAuth } from "@/hooks/Auth";
import Header from "@/components/header/Header";
import GreetingCard from "@/components/GreetingCard";
import ActivityCard from "@/components/ActivityCard";
import { useLanguage } from "@/hooks/Langauge";
import StreakDisplay from "@/components/header/StreakDisplay";
import FeedbackForm from "@/components/FeedbackForm";

const Home: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "home",
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedLanguage } = useLanguage();
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);

  const handleOpenFeedbackForm = () => {
    setIsFeedbackFormOpen(true);
  };

  const handleCloseFeedbackForm = () => {
    setIsFeedbackFormOpen(false);
  };

  return (
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

        <div className="flex h-16 max-h-12 items-center justify-between py-4 px-5 bg-white-sidebar border-black">
          <button
            onClick={handleOpenFeedbackForm}
            className="bg-white-500 text-black px-2 py-1 rounded-md hover:bg-red-600"
          >
            Give Feedback
          </button>
        </div>

        {isFeedbackFormOpen && (
          <div className="fixed inset-0 bg-white-800 bg-opacity-50 flex justify-center items-center">
            <FeedbackForm onClose={handleCloseFeedbackForm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
