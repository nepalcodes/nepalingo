import React from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import Header from "@/components/header/Header";
import ActivityCard from "@/components/ActivityCard";
import { useLanguage } from "@/hooks/Langauge";
import { getChapters } from "@/lib/getNextWord";

const Home: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "chapters",
  });
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();

  // Change chapters based on language
  const chapters = getChapters(selectedLanguage);

  return (
    <>
      <Header />
      <div className="flex flex-row flex-wrap gap-4 pt-10 justify-center">
        {chapters.map((chapter) => (
          <div className="mb-5 w-[500px]" key={chapter}>
            <ActivityCard
              backgroundImageUrl={`/${chapter}.webp`}
              quizYourselfText={chapter}
              descriptionText=""
              buttonText="Start Quiz"
              onClick={() => {
                // TODO: include chapter
                navigate(`/quiz/${chapter}`);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
