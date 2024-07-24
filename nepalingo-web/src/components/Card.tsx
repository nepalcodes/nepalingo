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
  isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({
  Word,
  TranslatedWord,
  Pronunciation,
  DevenagiriSpelling,
  ImageUrl,
  PronounciationUrl,
  isFlipped,
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
      className="relative w-[519px] h-[510px] rounded-[43px] overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`absolute inset-0 bg-[#4F56F0] text-white flex justify-center items-center backface-hidden ${isFlipped ? "rotate-y-180" : ""
          }`}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >
        {!isFlipped && <div className="text-4xl font-bold">{Word}</div>}
      </div>
      <div
        className={`absolute inset-0 bg-[#DCDEFF] text-black flex flex-col justify-center items-start p-4 backface-hidden ${isFlipped ? "" : "rotate-y-180"
          }`}
        style={{
          transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
          transition: "transform 0.6s",
        }}
      >
        <div className="bg-[#4F56F0] text-white w-full text-center py-4 rounded-t-[43px]">
          <p className="text-4xl font-bold">{Word}</p>
        </div>
        <div className="p-4 mt-10">
          <p className="text-xl font-bold mb-2">Nepali: {TranslatedWord}</p>
          <p className="text-xl font-bold mb-2">Newari: {DevenagiriSpelling}</p>
          <p className="text-xl font-bold mb-2">English: {Pronunciation}</p>
        </div>
        {PronounciationUrl && (
          <button onClick={handlePronunciation} className="absolute right-10 bottom-10">
            <FontAwesomeIcon icon={faVolumeHigh} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
