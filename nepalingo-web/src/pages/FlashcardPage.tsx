import Flashcard from "@/components/Flashcard";
import Header from "@/components/header/Header";
import React from "react";
import ReactGA from "react-ga4";

const FlashcardPage: React.FC = () => {
    ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
        title: "flashcard page",
    });
    return (
        <>
            <Header />
            <Flashcard />
        </>
    );
};
export default FlashcardPage;
