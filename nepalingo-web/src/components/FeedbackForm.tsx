import React, { useState } from 'react';

interface FeedbackFormProps {
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg mb-4">Please rate your experience</h2>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-2xl ${star <= (rating || 0) ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => handleRating(star)}
          >
            ★
          </button>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={onClose}
      >
        Submit
      </button>
    </div>
  );
};

export default FeedbackForm;
