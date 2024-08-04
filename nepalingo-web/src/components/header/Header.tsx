import React from "react";
import logo from "@/assets/NewLogo.png";
import UserProfile from "@/components/header/UserProfile";
import ChangeLanguage from "@/components/header/ChangeLanguage";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className=" border-gray-200  py-1 bg-black text-white flex justify-between items-center w-full h-16">
      <div className="flex-1">
        <Link to={"/"}>
          <img src={logo} alt="Nepalingo Logo" className="h-12" />
        </Link>
      </div>
      <div className="flex flex-row justify-between items-center gap-4">
        <a href="/about" className="text-white hover:underline">
          About
        </a>
        <ChangeLanguage />
        <UserProfile />
      </div>
    </nav>
  );
};

export default Header;
