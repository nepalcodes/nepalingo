import React from "react";
import Header from "@/components/header/Header";
import DictionarySearchBar from "@/components/DictionarySearchBar";

const DictionaryPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black" >
            <Header />
            <DictionarySearchBar language="newari" />
        </div>
    );
};

export default DictionaryPage;
