import React from "react";
import logo from "../../assets/NewLogo.png";
import UserProfile from "./UserProfile";
import ChangeLanguage from "./ChangeLanguage";

const Header: React.FC = () => {
  return (
    <nav className=" border-gray-200 px-4 lg:px-6 py-1 bg-[#1A1A1A] via-gray-900 to-black text-white flex justify-between items-center w-full h-16">
      <div className="flex-1">
        <a href="https://nepalingo.com">
          <img src={logo} alt="Nepalingo Logo" className="h-12" />
        </a>
      </div>
      <div className="flex flex-row justify-between items-center gap-4">
        <ChangeLanguage />
        <UserProfile />
      </div>
    </nav>
  );
};

export default Header;
