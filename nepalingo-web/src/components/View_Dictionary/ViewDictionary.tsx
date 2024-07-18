
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewDictionary: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/dictionary');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">View Dictionary</h1>
      <button
        onClick={handleRedirect}
        className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Go to Dictionary
      </button>
    </div>
  );
};

export default ViewDictionary;
