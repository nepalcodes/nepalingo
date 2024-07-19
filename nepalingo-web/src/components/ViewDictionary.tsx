import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const ViewDictionary: React.FC = () => {
  const backgroundImageUrl =
    "https://t3.ftcdn.net/jpg/00/73/08/22/360_F_73082224_ay4Tus31QNHNmGSIty53ZE6mBrBc47cV.jpg"; // Set your image URL
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/dictionary");
  };

  return (
    <div
      className="bg-cover text-white p-8 rounded-lg"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <h1 className="text-3xl font-bold mb-4">View Dictionary</h1>
      <Button
        className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleRedirect}
      >
        Go to Dictionary
      </Button>
    </div>
  );
};

export default ViewDictionary;
