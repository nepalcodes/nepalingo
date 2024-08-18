import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/hooks/Langauge";

interface CardProps {
  Word: string;
  TranslatedWord: string;
  NepaliWord?: string;
  Pronunciation: string;
  ImageUrl?: string;
  PronounciationUrl?: string;
  viewType: number;
}

const Card: React.FC<CardProps> = ({
  Word,
  TranslatedWord,
  NepaliWord,
  Pronunciation,
  ImageUrl,
  PronounciationUrl,
  viewType,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { selectedLanguage } = useLanguage();

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
    <div className="relative rounded-2xl overflow-hidden shadow-2xl w-[300px] h-[400px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[450px] lg:w-[519px] lg:h-[600px]">
      {/* Front View */}
      <div
        className={`absolute inset-0 bg-[#4f42d8] text-white flex justify-center items-center transition-transform duration-600 ${
          viewType === 0 ? "block" : "hidden"
        } rounded-2xl`}
      >
        {viewType === 0 && (
          <div className="text-3xl font-bold sm:text-3xl md:text-4xl lg:text-6xl">
            {Word}
          </div>
        )}
      </div>

      {/* Second View */}
      <div
        className={`absolute inset-0 flex flex-col transition-transform duration-600 ${
          viewType === 1 ? "block" : "hidden"
        }`}
      >
        <div className="relative bg-white text-black w-full h-full rounded-2xl overflow-hidden flex flex-col">
          <div className="relative w-full h-[30%] overflow-hidden rounded-t-2xl flex flex-col items-center justify-center bg-[#4f42d8]">
            <p className="text-2xl font-bold text-white sm:text-2xl md:text-3xl lg:text-5xl">
              {Word}
            </p>
            <p className="text-lg text-white sm:text-lg md:text-xl lg:text-2xl">
              {Pronunciation}
            </p>
            {PronounciationUrl && (
              <button
                onClick={handlePronunciation}
                className="absolute right-4 bottom-4 z-10 text-white"
              >
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            )}
          </div>
          <div className="relative w-full h-[30%] rounded-b-2xl overflow-hidden flex items-center justify-center">
            {ImageUrl && (
              <img
                src={ImageUrl}
                alt={Word}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-b-2xl"
              />
            )}
          </div>
          <div className="w-full p-4 flex flex-col items-center justify-center text-center">
            <div className="text-center flex flex-col">
              <div className="text-lg font-bold mb-2 flex justify-center sm:text-lg md:text-xl lg:text-2xl">
                <p>{selectedLanguage}: </p>
                <p className="ml-2">{TranslatedWord}</p>
              </div>
              {NepaliWord && (
                <div className="text-lg font-bold mb-2 flex justify-center sm:text-lg md:text-xl lg:text-2xl">
                  <p>Nepali: </p>
                  <p className="ml-2">{NepaliWord}</p>
                </div>
              )}
              <div className="text-lg font-bold mb-2 flex justify-center sm:text-lg md:text-xl lg:text-2xl">
                <p>English: </p>
                <p className="ml-2">{Word}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third View */}
      <div
        className={`absolute inset-0 flex flex-col transition-transform duration-600 ${
          viewType === 2 ? "block" : "hidden"
        }`}
      >
        <div className="relative bg-[#4f42d8] text-white w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="relative w-full h-[30%] overflow-hidden rounded-t-2xl flex flex-col items-center justify-center">
            <p className="text-2xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
              {Word}
            </p>
            <p className="text-lg sm:text-lg md:text-xl lg:text-2xl">
              {Pronunciation}
            </p>
            {PronounciationUrl && (
              <button
                onClick={handlePronunciation}
                className="absolute right-4 bottom-4 z-10 text-white"
              >
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            )}
          </div>
          <div className="relative h-[70%] w-full rounded-b-2xl overflow-hidden flex items-center justify-center">
            {ImageUrl && (
              <img
                src={ImageUrl}
                alt={Word}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-b-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
