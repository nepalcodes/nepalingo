import Flashcard from "@/components/Flashcard";
import Header from "@/components/header/Header";
import React, { useEffect } from "react";
import { useStreak } from "@/hooks/StreakContext";
import ReactGA from "react-ga4";

const FlashcardPage: React.FC = () => {
  const { updateStreak } = useStreak();

  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "flashcard page",
  });

  useEffect(() => {
    updateStreak(); // Trigger streak update on flashcard page load
  }, []);

  return (
    <>
      <Header />
      <Flashcard />
    </>
  );
};
export default FlashcardPage;
