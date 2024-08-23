import React from "react";
import logo from "@/assets/NewLogo.png";
import UserProfile from "@/components/header/UserProfile";
import ChangeLanguage from "@/components/header/ChangeLanguage";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className=" border-gray-200  py-1 bg-black text-white flex gap-4 justify-between items-center w-full h-16">
      <div>
        <Link to={"/"}>
          <img src={logo} alt="Nepalingo Logo" className="h-12" />
        </Link>
      </div>
      <a href="/feedback" className="text-white hover:underline">
        Give us Feedback!
      </a>
      <a href="/about" className="text-white hover:underline">
        About
      </a>
      <div className="flex-1"></div>
      <ChangeLanguage />
      <UserProfile />
    </nav>
  );
};

export default Header;
