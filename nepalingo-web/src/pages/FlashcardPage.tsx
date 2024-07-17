import Flashcard from "../components/Flashcard";
import Header from "../components/header/Header";
import React, { useEffect } from "react";
import { useStreak } from "../components/StreakContext";

const FlashcardPage: React.FC = () => {
  const { updateStreak } = useStreak();

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
