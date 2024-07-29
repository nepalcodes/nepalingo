import React, { useState } from 'react';


interface FeedbackFormProps {
  onClose: () => void;
}


const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [emojiRating, setEmojiRating] = useState<number | null>(null);
  const [comments, setComments] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);


  const handleStarRating = (rate: number) => {
    setRating(rate);
  };


  const handleEmojiRating = (rate: number) => {
    setEmojiRating(rate);
  };


  const handleSubmit = () => {

    setSubmitted(true);
    setTimeout(onClose, 5000);
  };


  return (
    <div className="bg-white p-6 rounded-lg">
      {submitted ? (
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Thank you for your feedback! 🎉 </p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">We value your feedback! 🌟</h2>
          <p className="mb-4">How would you rate your experience with Nepalingo?</p>

          <div className="mb-4">
            <p className="mb-2">Rate with stars:</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-3xl ${star <= (rating || 0) ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => handleStarRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>


          <div className="mb-4">
            <p className="mb-2">Rate with emojis:</p>
            <div className="flex">
              {['😟', '😐', '😊', '😃', '😍'].map((emoji, index) => (
                <button
                  key={index}
                  className={`text-3xl px-2 ${index + 1 <= (emojiRating || 0) ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => handleEmojiRating(index + 1)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>


          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Tell us more about your experience..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};


export default FeedbackForm;
