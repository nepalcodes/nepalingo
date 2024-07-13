import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface CardProps {
  Word: string;
  TranslatedWord: string;
  Pronunciation: string;
  DevenagiriSpelling: string;
  ImageUrl?: string;
  PronounciationUrl?: string;
  isFlipped: boolean;
  handleFlip: () => void;
}

const Card: React.FC<CardProps> = ({
  Word,
  TranslatedWord,
  Pronunciation,
  DevenagiriSpelling,
  ImageUrl,
  PronounciationUrl,
  isFlipped,
  handleFlip
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  console.log(ImageUrl)

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
    <div>
      <div className={`relative w-96 h-72 ${isFlipped ? 'flipped' : ''}`} style={{ perspective: '1000px' }}>
        <div
          className="bg-white text-4xl font-bold absolute inset-0 text-black flex justify-center items-center backface-hidden"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.6s' }}
        >
          {!isFlipped && <div>{Word}</div>}
        </div>
        <div
          className="absolute inset-0 bg-white text-black flex justify-center items-center backface-hidden transform rotateY-180 font-bold"
          style={{ transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)', transition: 'transform 0.6s' }}
        >
          <div className="flex flex-col items-start justify-center">
            {ImageUrl && (
              <img src={ImageUrl} alt={Word} className="absolute left-2 top-1/2 transform -translate-y-1/2 object-cover w-40 h-60" />
            )}
            <p className="absolute right-10 top-16 text-2xl font-bold">{TranslatedWord}</p>
            <p className="absolute right-10 top-28 text-sm">{DevenagiriSpelling}</p>
            <p className="absolute right-10 top-36 text-xs">{Pronunciation}</p>
            {PronounciationUrl && (
              <button onClick={handlePronunciation} className="absolute right-10 bottom-10">
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
