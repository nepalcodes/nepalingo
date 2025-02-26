import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import CustomTextInput from "@/components/CustomTextInput";
import Button from "@/components/Button";
import useDictionary from "@/hooks/useDictionary";
import SearchResponseCard from "@/components/SearchResponseCard";
import { useLanguage } from "@/hooks/Langauge";
import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_GHAT_GPT_API_KEY,
  dangerouslyAllowBrowser: true,
});

const DictionaryPage: React.FC = () => {
  const [sentences, setSentences] = useState<any>({});
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

  useEffect(() => {
    console.log(selectedLanguage);
    if (data && data.meanings?.length > 0) {
      data.meanings.forEach(async (meaning: any) => {
        if (selectedLanguage !== "Tajpuriya") {
          try {
            const response = await openai.chat.completions.create({
              messages: [
                {
                  role: "user",
                  content:
                    `Please provide a sentence in full` +
                    { selectedLanguage } +
                    `using the word "${meaning.meaningOriginal}. Also return the English translation of the sentence. Don't use other Nepali/English words. Seperate the English translation with a dash."`,
                },
              ],
              model: "gpt-3.5-turbo",
            });
            setSentences((prevSentences: any) => ({
              ...prevSentences,
              [meaning.meaningOriginal]: response.choices[0].message.content,
            }));
          } catch (error) {
            console.error("Error sending message:", error);
          }
        } else {
          setSentences((prevSentences: any) => ({
            ...prevSentences,
            [meaning.meaningOriginal]: "The language is not supported",
          }));
        }
      });
    }
  }, [data]);

  // const sendMessage = async (meaning: any) => {
  //   try {
  //     const response = await openai.chat.completions.create({
  //       messages: [
  //         {
  //           role: "user",
  //           content: `Please provide a sentence in full Newari using the word "${meaning.meaningOriginal}. Don't use Neapli/English words."`,
  //         },
  //       ],
  //       model: "gpt-3.5-turbo",
  //     });
  //     console.log(response.choices[0].message);
  //     setSentence(response.choices[0].message.content);
  //     console.log("Message sent");
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

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
            ? data.meanings.map((meaning, index) => {
                console.log(meaning);
                if (meaning.meaningEn !== "") {
                  return (
                    <SearchResponseCard
                      sentence={sentences[meaning.meaningOriginal] || ""}
                      meaning={meaning}
                      key={`Search-Meanings-${index}`}
                    />
                  );
                }
              })
            : error && (
                <p className="mt-2 text-primary text-center">{error.message}</p>
              )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
