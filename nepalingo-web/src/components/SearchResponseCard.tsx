import { Meaning } from "@/hooks/useDictionary";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const SearchResponseCard = ({ meaning }: { meaning: Meaning }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const handlePronunciation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!meaning.audio?.uri) {
      return;
    }

    if (audio) {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      } else {
        audio.currentTime = 0;
        void audio.play();
      }
    } else {
      const newAudio = new Audio(meaning.audio.uri);
      setAudio(newAudio);
      void newAudio.play();
    }
  };

  return (
    <div
      key={meaning.meaningOriginal}
      className=" p-4 bg-grayDark rounded-md  w-full flex gap-4 flex-row justify-between max-lg:flex-col"
    >
      <div className="flex-1">
        <div className="flex flex-row justify-between mb-4">
          <div>
            <h2 className="text-2xl font-primary font-bold text-white">
              {meaning.meaningOriginal}
            </h2>
            {meaning?.transliterations?.latn && (
              <p className=" text-sm text-gray-300">
                [{meaning.transliterations.latn}]
              </p>
            )}
          </div>
          {meaning.audio?.uri && (
            <button
              type="button"
              onClick={handlePronunciation}
              className="self-start text-white text-2xl transition-colors hover:text-primary focus-visible:outline-none"
              aria-label={`Play pronunciation for ${meaning.meaningOriginal}`}
            >
              <FontAwesomeIcon icon={faVolumeHigh} />
            </button>
          )}
        </div>
        <div className="flex flex-row flex-wrap gap-2 mt-2">
          {meaning.partsOfSpeech && (
            <div className="text-white bg-primary px-4 py-1 rounded-md capitalize">
              POS: {meaning.partsOfSpeech}
            </div>
          )}
          <div className="text-white bg-black px-4 py-1 rounded-md capitalize">
            {meaning.dialect} Dialect
          </div>
          {meaning.transliterations?.original && (
            <div className="text-white bg-black px-4 py-1 rounded-md capitalize">
              Nepal Lipi: {meaning.transliterations?.original}
            </div>
          )}
        </div>
        {meaning.meaningEn && (
          <p className="my-4 text-sm text-white font-secondary">
            {meaning.meaningEn}
          </p>
        )}
      </div>
      {meaning.image && (
        <img
          src={meaning.image.uri}
          alt={meaning.meaningOriginal}
          className="aspect-square w-64 rounded-lg max-lg:w-52 max-sm:w-full"
        />
      )}
    </div>
  );
};

export default SearchResponseCard;
