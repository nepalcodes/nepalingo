import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

interface ExitModalProps {
  onClose: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ onClose }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleYesClick = () => {
    setShowFeedbackForm(true);
  };

  const handleNoClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      {!showFeedbackForm ? (
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-lg mb-4">Are you sure you want to exit?</h2>
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={handleNoClick}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <FeedbackForm onClose={onClose} />
      )}
    </div>
  );
};

export default ExitModal;
