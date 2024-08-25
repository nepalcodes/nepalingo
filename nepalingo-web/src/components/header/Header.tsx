import React, { useState } from "react";
import logo from "@/assets/NewLogo.png";
import UserProfile from "@/components/header/UserProfile";
import ChangeLanguage from "@/components/header/ChangeLanguage";
import FeedbackForm from "@/components/FeedbackForm";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);

  const handleOpenFeedbackForm = () => {
    setIsFeedbackFormOpen(true);
  };

  const handleCloseFeedbackForm = () => {
    setIsFeedbackFormOpen(false);
  };

  return (
    <>
      <nav className="border-gray-200 py-1 bg-black text-white flex gap-2 justify-between items-center w-full h-16">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="Nepalingo Logo" className="max-h-12" />
          </Link>
        </div>
        <button
          onClick={handleOpenFeedbackForm}
          className="hover:underline hidden md:block"
        >
          Give us Feedback!
        </button>
        <a href="/about" className="hover:underline hidden md:block">
          About
        </a>
        <a href="/credits" className="hover:underline hidden md:block">
          Credits
        </a>
        <div className="flex-1"></div>
        <ChangeLanguage />
        <UserProfile />
      </nav>

      <div className="md:hidden flex gap-4 justify-center text-white">
        <button onClick={handleOpenFeedbackForm} className="hover:underline">
          Give us Feedback!
        </button>
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/credits" className="hover:underline">
          Credits
        </a>
      </div>

      {isFeedbackFormOpen && (
        <div className="z-20 fixed inset-0 bg-white-800 bg-opacity-50 flex justify-center items-center">
          <FeedbackForm onClose={handleCloseFeedbackForm} />
        </div>
      )}
    </>
  );
};

export default Header;
