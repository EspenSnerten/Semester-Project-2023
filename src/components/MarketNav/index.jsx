import React, { useState } from "react";
import AuctionList from "../AuctionList";
import UserItems from "../UserItems";
import UserBids from "../UserBids";
const arrowIcon = "/Arrow-icon.png";

export default function MarketNav() {
  const [activeButton, setActiveButton] = useState("Market");
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showDropdown, setShowDropdown] = useState(true);
  const [renderedComponentName, setRenderedComponentName] = useState("Market");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
      <div className="flex flex-col justify-center hidden w-full mt-12 mb-4">
        <div className="flex flex-col mx-auto max-w-[340px] w-full">
          <div className="flex py-2">
            <h1 className="flex w-full pl-1 tracking-wide text-white">
              {renderedComponentName}
            </h1>
            <img
              src={arrowIcon}
              alt=""
              className={`w-2 my-auto transition-all ease-in-out rotate-${
                showDropdown ? "[270deg]" : "[90deg]"
              } mr-2`}
            />
          </div>
          <div className="h-[1.5px] bg-white w-full"></div>
        </div>

        {showDropdown && (
          <nav className="w-full mx-auto mt-1 bg-gradient-to-r from-black via-slate-900 to-black sm:hidden">
            <ul className="flex flex-col py-2">
              {["Market", "Your Bids", "Listed Items"].map((buttonName) => (
                <li key={buttonName} className="py-4 mx-auto">
                  <button
                    className={`tracking-wider text-white text-base ${
                      activeButton === buttonName ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(buttonName)}
                  >
                    {buttonName}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <details className="flex justify-start w-full mb-4 dropdown sm:hidden mt-9">
        <summary className="max-w-[340px] justify-start p-0 flex w-full mx-auto btn border-none text-white bg-transparent outline-none hover:bg-none relative">
          <h1 className="flex h-1 ml-1 text-lg font-normal tracking-wider">{renderedComponentName}</h1>
          <img src={arrowIcon} alt="" className="absolute w-2 right-1 rotate-[270deg]"/>
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

      <div className="hidden w-full p-0 mb-4 mt-9 collapse">
        <input type="checkbox" />
        <div className="flex w-full collapse-title">
          <div className="flex py-2 max-w-[340px] w-full mx-auto">
            <h1 className="flex w-full ml-4 tracking-wide text-white">
              {renderedComponentName}
            </h1>
            <div className="flex justify-end w-full">
              <img
                src={arrowIcon}
                alt=""
                className="w-2 my-auto rotate-[270deg]"
              />
            </div>
          </div>{" "}
        </div>

        <nav className="w-full mx-auto mt-1 collapse-content bg-gradient-to-r from-black via-slate-900 to-black">
          <ul className="flex flex-col py-2">
            {["Market", "Your Bids", "Listed Items"].map((buttonName) => (
              <li key={buttonName} className="py-4 mx-auto">
                <button
                  className={`tracking-wider text-white text-base ${
                    activeButton === buttonName ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(buttonName)}
                >
                  {buttonName}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="justify-center hidden w-full mb-16 sm:flex mt-36">
        <nav className="mx-auto">
          <ul className="flex">
            {["Market", "Your Bids", "Listed Items"].map((buttonName) => (
              <li key={buttonName}>
                <button
                  className={`text-lg tracking-wider text-white px-9 ${
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
                      className={`h-[2px] w-[100%] mx-auto bg-blue-500 transition-all duration-200 ease-in rounded-sm`}
                    ></div>
                  )}
                {hoveredButton !== buttonName &&
                  activeButton !== buttonName && (
                    <div
                      className={`h-[2px] w-[100%] mx-auto bg-zinc-300 transition-all duration-200 ease-in rounded-sm`}
                    ></div>
                  )}
                {activeButton === buttonName && (
                  <div
                    className={`h-[2px] w-[100%] mx-auto bg-blue-500 transition-all duration-200 ease-in rounded-sm`}
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
