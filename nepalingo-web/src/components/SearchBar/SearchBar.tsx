import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useDictionary, { DictionaryProps} from '../../hooks/useDictionary';
import { v4 as uuidv4 } from 'uuid';

interface DictionarySearchBarProps {
  language: DictionaryProps['language']; // Define language as a prop
}

const DictionarySearchBar: React.FC<DictionarySearchBarProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, isLoading, error } = useDictionary({ language, word: searchTerm });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    // Trigger re-fetch (not necessary for useSWR as it auto-updates)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-3/4 flex items-center relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search here"
          className="w-full p-2 pl-5 border border-gray-300 rounded-md text-lg shadow-sm transition-colors duration-300 focus:border-blue-500 focus:shadow-lg bg-white"
        />
        <span
          className="absolute right-2 text-lg text-gray-600 cursor-pointer"
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>

      {error && <p className="mt-2 text-red-600">{error.message}</p>}
      <ul className="list-none p-0 mt-5 w-3/4">
  {isLoading && <p className="mt-2 text-gray-600">Loading...</p>}
  {data && data.meanings ? (
    data.meanings.length > 0 ? (
      data.meanings.map((meaning) => (
        <li key={uuidv4()} className="bg-gray-100 p-4 mb-2 rounded-md shadow transition-all duration-300 hover:bg-gray-200">
          <h2 className="m-0 mb-2 text-xl text-gray-900">{data.word}</h2>
          <p className="my-1 text-sm text-gray-700">{meaning.meaningEn}</p>
          {meaning.meaningNp && <p className="my-1 text-sm text-gray-700">{meaning.meaningNp}</p>}
          {meaning.meaningOriginal && <p className="my-1 text-sm text-gray-700">{meaning.meaningOriginal}</p>}
          {meaning.audio && <audio controls src={meaning.audio.uri}></audio>}
          {meaning.image && <img src={meaning.image.uri} alt={data.word} />}
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
