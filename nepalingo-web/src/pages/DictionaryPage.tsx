import React, { useState } from "react";
import Header from "@/components/header/Header";
import CustomTextInput from "@/components/CustomTextInput";
import Button from "@/components/Button";
import useDictionary from "@/hooks/useDictionary";
import useTajpuriya from "@/hooks/useTajpuriya";
import SearchResponseCard from "@/components/SearchResponseCard";
import { useLanguage } from "@/hooks/Langauge";

const DictionaryPage: React.FC = () => {
  const { selectedLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const isTajpuriya = selectedLanguage === "Tajpuriya";
  const { data, isLoading, error } = useDictionary({
    language: "newari",
    word: searchTerm,
  });

  const tajpuriyaMeaning = useTajpuriya({ word: searchTerm.toLowerCase() });

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setSearchTerm(formData.get("search") as string);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="max-w-screen-lg px-6 mx-auto">
        <form
          onSubmit={handleSearchClick}
          className="flex items-center relative h-16 w-full"
          autoComplete="off"
        >
          <CustomTextInput
            name="search"
            type="text"
            placeholder="Search for words here..."
            className="text-xl font-primary font-bold focus-visible:outline-none"
          />
          <Button
            type="submit"
            className="ml-2 text-lg text-gray-600 cursor-pointer w-40"
          >
            Search
          </Button>
        </form>

        {!isLoading && !data && error && (
          <p className="mt-2 text-red-600">{error.message}</p>
        )}
        <div className="p-0 mt-5 gap-4 flex flex-col ">
          {isLoading && !isTajpuriya && (
            <p className="mt-2 text-gray-600 ">Loading...</p>
          )}
          {!isLoading && data && data.meanings?.length > 0 && !isTajpuriya
            ? data.meanings.map((meaning, index) => (
                <SearchResponseCard
                  meaning={meaning}
                  key={`Search-Meanings-${index}`}
                />
              ))
            : !isLoading &&
              error &&
              !isTajpuriya && (
                <p className="mt-2 text-primary text-center">{error.message}</p>
              )}
          {isTajpuriya && tajpuriyaMeaning && (
            <SearchResponseCard
              meaning={{
                meaningOriginal: tajpuriyaMeaning,
                meaningEn: searchTerm,
                language: "tajpuriya",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
