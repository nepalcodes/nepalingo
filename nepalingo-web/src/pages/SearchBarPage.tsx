import React from 'react';
import Header from '../components/Header'; 
import DictionarySearchBar from '../components/SearchBar/SearchBar';

const SearchBarPage: React.FC = () => {
  return (
    <>
      <Header />  
      <h1 className="text-center text-4xl mt-4">Search Dictionary</h1>  
      <DictionarySearchBar language="newari"/>
    </>
  );
}

export default SearchBarPage;