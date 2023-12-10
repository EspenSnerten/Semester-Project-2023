import React from "react";

const Sort = ({ onSortChange, isOpen, toggleModal }) => {
  const handleSortChange = (sortOption) => {
    onSortChange(sortOption);
    toggleModal();
  };

  return (
    <nav
      className={`flex flex-col bg-black rounded-sm transition-all duration-300 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <ul>
        <li
          className="p-2 tracking-wide text-white cursor-pointer"
          onClick={() => handleSortChange("created-desc")}
        >
          New to Old
        </li>
        <li
          className="p-2 tracking-wide text-white cursor-pointer"
          onClick={() => handleSortChange("created-asc")}
        >
          Old to New
        </li>
        <li
          className="p-2 tracking-wide text-white cursor-pointer"
          onClick={() => handleSortChange("bids-desc")}
        >
          Number of Bids
        </li>
        <li
          className="p-2 tracking-wide text-white cursor-pointer"
          onClick={() => handleSortChange("time-left-desc")}
        >
          Time left on Bid
        </li>
      </ul>
    </nav>
  );
};

export default Sort;
