import React, { useState } from "react";
import useDictionary, { DictionaryProps } from "../hooks/useDictionary";
import InputText from "../components/InputText";
import Button from "../components/Button";

interface DictionarySearchBarProps {
  language: DictionaryProps["language"];
}

const DictionarySearchBar: React.FC<DictionarySearchBarProps> = ({
  language,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, error } = useDictionary({
    language,
    word: searchTerm,
  });

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <form
        onSubmit={handleSearchClick}
        className="w-3/4 flex items-center relative"
      >
        <InputText
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for words here..."
        />
        <Button
          type="submit"
          className="ml-4 text-lg text-gray-600 cursor-pointer h-14"
        >
          Search
        </Button>
      </form>

      {error && <p className="mt-2 text-red-600">{error.message}</p>}
      <ul className="list-none p-0 mt-5 w-3/4">
        {isLoading && <p className="mt-2 text-gray-600">Loading...</p>}
        {data && data.meanings ? (
          data.meanings.length > 0 ? (
            data.meanings.map((meaning) => (
              <li
                key={meaning.meaningOriginal}
                className="bg-gray-100 p-4 mb-2 rounded-md shadow transition-all duration-300 hover:bg-gray-200"
              >
                <h2 className="m-0 mb-2 text-xl text-gray-900">{data.word}</h2>
                <p className="my-1 text-sm text-gray-700">
                  {meaning.meaningEn}
                </p>
                {meaning.meaningNp && (
                  <p className="my-1 text-sm text-gray-700">
                    {meaning.meaningNp}
                  </p>
                )}
                {meaning.meaningOriginal && (
                  <p className="my-1 text-sm text-gray-700">
                    {meaning.meaningOriginal}
                  </p>
                )}
                {meaning.audio && (
                  <audio controls src={meaning.audio.uri}></audio>
                )}
                {meaning.image && (
                  <img src={meaning.image.uri} alt={data.word} />
                )}
              </li>
            ))
          ) : (
            <p className="mt-2 text-gray-600">No results found</p>
          )
        ) : (
          <p className="mt-2 text-gray-600">No results available</p>
        )}
      </ul>
    </div>
  );
};

export default DictionarySearchBar;
