import React from "react";
import logo from "../../assets/NepaLingoLogoWhiteBg.jpg";
import ProfileIcon from "./ProfileIcon";

const Header: React.FC = () => {
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl">
        <a href="https://nepalingo.com" className="flex items-center">
          <img src={logo} alt="Nepalingo Logo" className="h-24" />
        </a>
        <div className="absolute right-4">
          <ProfileIcon />
        </div>
      </div>
    </nav>
  );
};

export default Header;
