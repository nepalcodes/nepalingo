import React from "react";

interface ExitModalProps {
  onClose: () => void;
  onConfrim: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ onConfrim, onClose }) => {

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg mb-4">Are you sure you want to exit?</h2>
        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={onConfrim}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
