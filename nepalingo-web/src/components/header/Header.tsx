import React from "react";
import logo from "../../assets/NepaLingoLogoWhiteBg.jpg";
import UserProfile from "./UserProfile";
import ChangeLanguage from "./ChangeLanguage";

const Header: React.FC = () => {
  return (
    <nav
      className="bg-white border-gray-200 px-4 lg:px-6 py-1 bg-gradient-to-r from-black via-gray-900 to-black
 text-white"
    >
      <div className="flex justify-between items-center mx-auto max-w-screen-xl h-16">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="https://nepalingo.com" className="flex items-center">
            <img src={logo} alt="Nepalingo Logo" className="h-12" />
          </a>
        </div>
        <div className="absolute right-20">
          <ChangeLanguage />
        </div>
        <div className="absolute right-4">
          <UserProfile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
