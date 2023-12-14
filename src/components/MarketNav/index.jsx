import React, { useState } from "react";
import AuctionList from "../AuctionList";
import UserItems from "../UserItems";
import UserBids from "../UserBids";
const arrowIcon = "/Arrow-icon.png";

export default function MarketNav() {
  const [activeButton, setActiveButton] = useState("Market");
  const [hoveredButton, setHoveredButton] = useState(null);
  const [renderedComponentName, setRenderedComponentName] = useState("Market");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setRenderedComponentName(buttonName);
  };

  const handleButtonHover = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const renderComponent = () => {
    switch (activeButton) {
      case "Market":
        return <AuctionList />;
      case "Your Bids":
        return <UserBids />;
      case "Listed Items":
        return <UserItems />;
      default:
        return null;
    }
  };

  return (
    <>
      <details className="flex justify-start w-full mb-4 dropdown sm:hidden mt-9">
        <summary className="max-w-[340px] justify-start p-0 flex w-full mx-auto btn border-none text-white bg-transparent outline-none hover:bg-none relative">
          <h1 className="flex h-1 ml-1 text-lg font-normal tracking-wider">
            {renderedComponentName}
          </h1>
          <img
            src={arrowIcon}
            alt=""
            className="absolute w-2 right-1 rotate-[270deg]"
          />
          <div className="h-[1.5px] bg-white w-full"></div>
        </summary>
        <ul className="dropdown-content z-[1]  w-full">
          {["Market", "Your Bids", "Listed Items"].map((buttonName) => (
            <li
              key={buttonName}
              className="flex flex-col w-full py-4 mx-auto bg-gradient-to-r from-black via-slate-900 to-black"
            >
              <button
                className={`tracking-wider mx-auto text-white text-base ${
                  activeButton === buttonName ? "active" : ""
                }`}
                onClick={() => handleButtonClick(buttonName)}
              >
                {buttonName}
              </button>
            </li>
          ))}
        </ul>
      </details>

      <div className="justify-center hidden w-full mb-16 sm:flex mt-36">
        <nav className="mx-auto">
          <ul className="flex">
            {["Market", "Your Bids", "Listed Items"].map((buttonName) => (
              <li key={buttonName}>
                <button
                  className={`text-lg tracking-wider text-white px-9 transition-all duration-200 ease-in-out ${
                    activeButton === buttonName ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(buttonName)}
                  onMouseEnter={() => handleButtonHover(buttonName)}
                  onMouseLeave={() => handleButtonHover(null)}
                >
                  {buttonName}
                </button>
                {hoveredButton === buttonName &&
                  activeButton !== buttonName && (
                    <div
                      className={`h-[2px] w-[100%] mx-auto bg-blue-500 transition-all duration-200 ease-in-out rounded-sm`}
                    ></div>
                  )}
                {hoveredButton !== buttonName &&
                  activeButton !== buttonName && (
                    <div
                      className={`h-[2px] w-[100%] mx-auto bg-zinc-300 transition-all duration-200 ease-in-out rounded-sm`}
                    ></div>
                  )}
                {activeButton === buttonName && (
                  <div
                    className={`h-[2px] w-[100%] mx-auto bg-blue-500 transition-all duration-200 ease-in-out rounded-sm`}
                  ></div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {renderComponent()}
    </>
  );
}
