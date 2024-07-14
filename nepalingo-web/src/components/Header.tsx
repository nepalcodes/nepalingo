import React from "react";
import logo from "../assets/NepaLingoLogoWhiteBg.jpg";

const Header: React.FC = () => {
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 text-center">
      <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
        <a href="https://nepalingo.com" className="flex items-center">
          <img src={logo} alt="Nepalingo Logo" className="h-24" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
