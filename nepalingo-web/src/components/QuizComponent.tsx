import React, { useState } from "react";
import ExitModal from "./ExitModal";

const QuizComponent: React.FC = () => {
  const [showExitModal, setShowExitModal] = useState(false);

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  return (
    <div className="p-4">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={handleExitClick}
      >
        Exit
      </button>
      {showExitModal && <ExitModal onClose={() => setShowExitModal(false)} onConfrim={() => setShowExitModal(true)}
      />}
    </div>
  );
};

export default QuizComponent;
