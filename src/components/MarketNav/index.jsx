import React, { useState } from "react";
import AuctionList from "../AuctionList";
import UserItems from "../UserItems";
import UserBids from "../UserBids";
import { Link } from "@tanstack/react-router";

const arrowIcon = "/Arrow-icon.png";

const loginMessage = (
  <div className="text-white w-[95%] flex flex-col justify-center mx-auto mt-[30vh]">
    <h2 className="mx-auto mb-3 text-base tracking-wider text-center text-white">
      You need to login to view this content
    </h2>
    <Link
      to="/login"
      className="relative inline-flex items-center justify-center py-1.5 m-auto mx-auto overflow-hidden text-base font-medium text-white transition duration-300 ease-out bg-black rounded-sm shadow-md md:text-base px-4 group tracking-wider"
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
        Login
      </span>
      <span className="relative invisible">Button Text</span>
    </Link>
  </div>
);

export default function MarketNav() {
  const [activeButton, setActiveButton] = useState("Market");
  const [hoveredButton, setHoveredButton] = useState(null);
  const [renderedComponentName, setRenderedComponentName] = useState("Market");

  const accessToken = localStorage.getItem("accessToken");

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
        return accessToken ? <UserBids /> : loginMessage;
      case "Listed Items":
        return accessToken ? <UserItems /> : loginMessage;
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
