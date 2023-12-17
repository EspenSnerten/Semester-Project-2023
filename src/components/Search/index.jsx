import React, { useState } from "react";

const Search = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearchChange(searchTerm);
  };

  return (
    <div className="flex justify-center w-full mx-auto mb-2 sm:mb-0">
      <input
        type="text"
        placeholder="Search.."
        className="block max-w-[340px] w-full sm:w-full px-4 py-1.5 text-white bg-black/40 border-gray-800 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default Search;
