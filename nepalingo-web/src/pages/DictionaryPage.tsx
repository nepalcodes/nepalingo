import React, { useState } from "react";
import Header from "@/components/header/Header";
import CustomTextInput from "@/components/CustomTextInput";
import Button from "@/components/Button";
import useDictionary from "@/hooks/useDictionary";
import SearchResponseCard from "@/components/SearchResponseCard";
import { useLanguage } from "@/hooks/Langauge";

const DictionaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { selectedLanguage } = useLanguage();
  const { data, isLoading, error } = useDictionary({
    language: selectedLanguage || "",
    word: searchTerm,
  });

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
          className="  flex items-center relative h-16 w-full"
          autoComplete="off"
        >
          <CustomTextInput
            name="search"
            type="text"
            placeholder="Search for words here..."
            className=" text-xl font-primary font-bold focus-visible:outline-none"
          />
          <Button
            type="submit"
            className="ml-2 text-lg text-gray-600 cursor-pointer w-40"
          >
            Search
          </Button>
        </form>

        <div className="p-0 mt-5 gap-4 flex flex-col ">
          {isLoading && <p className="mt-2 text-gray-600 ">Loading...</p>}
          {data && data.meanings?.length > 0
            ? data.meanings.map((meaning, index) => (
                <SearchResponseCard
                  meaning={meaning}
                  key={`Search-Meanings-${index}`}
                />
              ))
            : error && (
                <p className="mt-2 text-primary text-center">{error.message}</p>
              )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
