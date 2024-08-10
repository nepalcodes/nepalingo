import { Meaning } from "@/hooks/useDictionary";
import React from "react";

const SearchResponseCard = ({
  meaning,
  sentence,
}: {
  meaning: Meaning;
  sentence: string;
}) => {
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
          {meaning.audio && (
            <audio
              controls
              src={meaning.audio.uri}
              className="max-w-28 "
            ></audio>
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
          <>
            <p className="my-4 text-sm text-white font-secondary">
              {meaning.meaningEn}
            </p>
            <p
              style={{
                fontWeight: "bold",
              }}
              className="text-primary"
            >
              Examples
            </p>
            <p className="my-4 text-sm text-white font-secondary">
              {sentence.includes("-")
                ? sentence.split("-")[0]
                : sentence.includes("|")
                  ? sentence.split("—")[0]
                  : sentence}
              <p>
                {sentence.includes("-")
                  ? sentence.split("-")[1]
                  : sentence.includes("|")
                    ? sentence.split("—")[1]
                    : sentence}
              </p>
            </p>
          </>
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
