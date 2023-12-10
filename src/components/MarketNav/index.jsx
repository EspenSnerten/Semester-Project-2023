import React, { useState } from "react";
import AuctionList from "../AuctionList";
import UserItems from "../UserItems";
import UserBids from "../UserBids";

export default function MarketNav() {
  const [activeButton, setActiveButton] = useState("Market");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
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
      <div className="flex justify-center w-full px-3 mb-16 mt-36">
        <nav className="mx-auto">
          <ul className="flex">
            {["Market", "Your Bids", "Listed Items"].map((buttonName) => (
              <li key={buttonName}>
                <button
                  className={`text-lg tracking-wider text-white px-9 ${
                    activeButton === buttonName ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(buttonName)}
                >
                  {buttonName}
                </button>
                {activeButton === buttonName && (
                  <div className="h-[2px] bg-white w-[75%] mx-auto"></div>
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
