import React, { useState } from "react";
import { supabase } from "../supabaseClient";

interface FeedbackFormProps {
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [emojiRating, setEmojiRating] = useState<number | null>(null);
  const [comments, setComments] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (rating === null || emojiRating === null) {
      setError("Please provide both a star and emoji rating.");
      return;
    }

    // Insert feedback into Supabase
    const { error: insertError } = await supabase
      .from("feedback")
      .insert([{ rating, emoji_rating: emojiRating, comments }]);

    if (insertError) {
      console.error("Error inserting feedback:", insertError);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {submitted ? (
        <div className="text-center">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl p-2"
            onClick={handleClose}
          >
            &times;
          </button>
          <p className="text-lg font-semibold mb-4 text-green-600">
            Thank you for your feedback! 🎉
          </p>
        </div>
      ) : (
        <>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            We value your feedback! 🌟
          </h2>
          <p className="mb-4 text-gray-700">
            How would you rate your experience with Nepalingo?
          </p>

          <div className="mb-4">
            <p className="mb-2 text-gray-800">Rate with stars:</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-3xl ${star <= (rating || 0) ? "text-yellow-500" : "text-gray-400"}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-gray-800">Rate with emojis:</p>
            <div className="flex">
              {["😟", "😐", "😊", "😃", "😍"].map((emoji, index) => (
                <button
                  key={index}
                  className={`text-3xl px-2 transition-transform duration-200 transform ${
                    emojiRating === index + 1
                      ? "outline outline-2 outline-green-500 scale-125"
                      : ""
                  }`}
                  onClick={() => setEmojiRating(index + 1)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Tell us more about your experience..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
