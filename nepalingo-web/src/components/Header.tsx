import React from "react";
import logo from "../assets/NepaLingoLogoWhiteBg.jpg";

const Header: React.FC = () => {
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 text-center">
      <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
        <a href="https://nepalingo.com" className="flex items-center">
          <img src={logo} alt="Nepalingo Logo" className="h-24" />
        </a>
        {/* TODO: Sign out logic */}
        {/* <div className="flex items-center lg:order-2"> */}
        {/*   <a */}
        {/*     href="#" */}
        {/*     className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" */}
        {/*   > */}
        {/*      */}
        {/*     Sign Out */}
        {/*   </a> */}
        {/* </div> */}
      </div>
    </nav>
  );
};

export default Header;
