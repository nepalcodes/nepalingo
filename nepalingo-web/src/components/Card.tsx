import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  Word: string;
  TranslatedWord: string;
  Pronunciation: string;
  DevenagiriSpelling: string;
  ImageUrl?: string;
  PronounciationUrl?: string;
  viewType: number;
}

const Card: React.FC<CardProps> = ({
  Word,
  TranslatedWord,
  Pronunciation,
  DevenagiriSpelling,
  ImageUrl,
  PronounciationUrl,
  viewType,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePronunciation = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (PronounciationUrl) {
      if (audio) {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        } else {
          audio.play();
        }
      } else {
        const newAudio = new Audio(PronounciationUrl);
        setAudio(newAudio);
        newAudio.play();
      }
    }
  };

  return (
    <div
      className={`relative rounded-[43px] overflow-hidden shadow-2xl ${
        viewType === 1 ? "w-[519px] h-[600px]" : "w-[519px] h-[510px]"
      }`}
      style={{ perspective: "1000px" }}
    >
      {/* Front View */}
      <div
        className={`absolute inset-0 bg-[#c8383c] text-[#ffffff] flex justify-center items-center ${
          viewType === 0 ? "block" : "hidden"
        }`}
        style={{
          transition: "transform 0.6s",
        }}
      >
        {viewType === 0 && <div className="text-6xl font-bold">{Word}</div>} {/* Increased text size */}
      </div>

      {/* Second View */}
      <div
        className={`absolute inset-0 flex flex-col ${
          viewType === 1 ? "block" : "hidden"
        }`}
        style={{
          transition: "transform 0.6s",
        }}
      >
        <div
          className="relative bg-[#DC143C] text-[#ffffff] w-full rounded-[43px]"
          style={{
            height: "100%", // Main red div height
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            className="relative bg-[#1a1a1a] w-full rounded-[20px] mx-4 mt-4"
            style={{
              overflow: "hidden",
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {ImageUrl && (
              <div className="relative h-[70%] w-full">
                <img
                  src={ImageUrl}
                  alt={Word}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-[20px]"
                />
              </div>
            )}
            <div
              className="flex flex-col items-center justify-center h-[30%] z-10"
              style={{ flex: "0 1 auto" }}
            >
              <p className="text-5xl font-bold">{Word}</p>
              <p className="text-2xl">{Pronunciation}</p>
              {PronounciationUrl && (
                <button
                  onClick={handlePronunciation}
                  className="absolute right-4 bottom-4 z-10"
                >
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </button>
              )}
            </div>
          </div>
          <div
            className="w-full p-4"
            style={{ borderRadius: '20px 20px 43px 43px' }} // Adjust the radius for the red div
          >
            <p className="text-2xl font-bold mb-2">Nepali: {TranslatedWord}</p>
            <p className="text-2xl font-bold mb-2">Newari: {DevenagiriSpelling}</p>
            <p className="text-2xl font-bold mb-2">English: {Pronunciation}</p>
          </div>
        </div>
      </div>

      {/* Third View */}
      <div
        className={`absolute inset-0 flex flex-col ${
          viewType === 2 ? "block" : "hidden"
        }`}
        style={{
          transition: "transform 0.6s",
        }}
      >
        <div
          className="relative bg-[#c8383c] text-[#ffffff] w-full h-full rounded-[43px]"
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {ImageUrl && (
            <div className="relative h-[70%] w-full">
              <img
                src={ImageUrl}
                alt={Word}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-[43px]"
              />
            </div>
          )}
          <div
            className="flex flex-col items-center justify-center h-[30%] z-10"
            style={{ flex: "0 1 auto" }}
          >
            <p className="text-5xl font-bold">{Word}</p>
            <p className="text-2xl">{Pronunciation}</p>
            {PronounciationUrl && (
              <button
                onClick={handlePronunciation}
                className="absolute right-4 bottom-4 z-10"
              >
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
