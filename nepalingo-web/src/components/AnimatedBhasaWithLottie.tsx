import React from "react";
import Lottie from "lottie-react";
import bhasaAnimationData from "@/assets/NepalingoCreatureBlinkWave.json";

const BhasaAnimation: React.FC = () => {
  return (
    <div>
      <Lottie animationData={bhasaAnimationData} loop={true} />
    </div>
  );
};

export default BhasaAnimation;
