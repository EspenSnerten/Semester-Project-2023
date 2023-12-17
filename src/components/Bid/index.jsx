import React, { useState } from "react";

const Bid = () => {
  const listingId = window.location.pathname.split("/").pop();
  const [bidAmount, setBidAmount] = useState("");
  const [bidStatus, setBidStatus] = useState(""); // Added bidStatus state
  const token = localStorage.getItem("accessToken");

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(bidAmount) || bidAmount <= 0) {
      setBidStatus("Please enter a valid bid amount");
      return;
    }

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: parseFloat(bidAmount),
          }),
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        setBidStatus("A higher bid has been placed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleBidSubmit} className="flex gap-4">
          <input
            type="number"
            placeholder="0,-"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="block max-w-[120px] w-full px-4 py-1.5 text-white bg-black/40 border-gray-800 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <button
            type="submit"
            className="px-3 tracking-wide text-white bg-blue-600 rounded-sm"
          >
            Place Bid
          </button>
        </form>
        {bidStatus && <p className="mt-2 text-red-500">{bidStatus}</p>}
      </div>
    </>
  );
};

export default Bid;
