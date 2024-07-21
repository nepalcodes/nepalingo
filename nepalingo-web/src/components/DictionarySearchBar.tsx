import React, { useState } from "react";
import useDictionary, { DictionaryProps } from "../hooks/useDictionary";
import CustomTextInput from "../components/CustomTextInput";
import Button from "../components/Button";

interface DictionarySearchBarProps {
    language: DictionaryProps["language"];
}

const DictionarySearchBar: React.FC<DictionarySearchBarProps> = ({
    language,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data, isLoading, error } = useDictionary({
        language,
        word: searchTerm,
    });
    console.log(data?.meanings)

    const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.target as HTMLFormElement);
        setSearchTerm(formData.get('search') as string)
    };

    return (
        <div className="flex flex-col items-center justify-center mt-5 ">
            <div className="max-w-screen-lg px-6">
                <form
                    onSubmit={handleSearchClick}
                    className="w-3/4 flex items-center relative h-16 w-full"
                    autoComplete="off"
                >
                    <CustomTextInput
                        name="search"
                        type="text"
                        placeholder="Search for words here..."
                        className="text-lg font-primary font-bold focus-visible:outline-none"
                    />
                    <Button
                        type="submit"
                        className="ml-2 text-lg text-gray-600 cursor-pointer w-40"
                    >
                        Search
                    </Button>
                </form>

                {!isLoading && !data && error && <p className="mt-2 text-red-600">{error.message}</p>}
                <div className="p-0 mt-5 gap-4 flex flex-col ">
                    {isLoading && <p className="mt-2 text-gray-600 ">Loading...</p>}
                    {data && data.meanings?.length > 0 ? (
                        data.meanings.map((meaning) => (
                            <div
                                key={meaning.meaningOriginal}
                                className=" p-4 bg-grayDark rounded-md  w-full flex gap-4 flex-row justify-between max-lg:flex-col"
                            >
                                <div className="flex-1">
                                    <div className="flex flex-row justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-primary font-bold text-white">{meaning.meaningOriginal}</h2>
                                            {

                                                meaning?.transliterations?.latn && <p className=" text-sm text-gray-300">
                                                    [{meaning.transliterations.latn}]
                                                </p>
                                            }
                                        </div>
                                        {meaning.audio && (
                                            <audio controls src={meaning.audio.uri} className="max-w-28 "></audio>
                                        )}
                                    </div>
                                    <div className="flex flex-row flex-wrap gap-2 mt-2">
                                        {meaning.partsOfSpeech && <div className="text-white bg-primary px-4 py-1 rounded-md capitalize">POS: {meaning.partsOfSpeech}</div>}
                                        <div className="text-white bg-black px-4 py-1 rounded-md capitalize">{meaning.dialect} Dialect</div>
                                        {meaning.transliterations?.original &&

                                            <div className="text-white bg-black px-4 py-1 rounded-md capitalize">Nepal Lipi: {meaning.transliterations?.original}</div>
                                        }
                                    </div>
                                    {meaning.meaningEn && (
                                        <p className="my-4 text-sm text-white font-secondary">
                                            {meaning.meaningEn}
                                        </p>
                                    )}
                                </div>
                                {meaning.image && (
                                    <img src={meaning.image.uri} alt={data.word} className="aspect-square w-64 rounded-lg max-lg:w-52 max-sm:w-full" />
                                )}
                            </div>
                        ))
                    ) : error && (
                        <p className="mt-2 text-primary text-center">{error.message}</p>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default DictionarySearchBar;
