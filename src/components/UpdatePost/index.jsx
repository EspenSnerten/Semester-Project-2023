import React, { useState } from "react";
import axios from "axios";

export default function UpdatePost({ isOpen, toggleModal }) {
  const imgIcon = "/img-icon.png";
  const plussIcon = "/Pluss-icon.png";

  const [urlInputs, setUrlInputs] = useState([""]);
  const [tagInputs, setTagInputs] = useState([""]);
  const [auctionTitle, setAuctionTitle] = useState("");
  const [listingDescription, setListingDescription] = useState("");
  const [auctionEnd, setAuctionEnd] = useState("");

  const addNewUrlInput = () => {
    setUrlInputs([...urlInputs, ""]);
  };

  const addNewTagInput = () => {
    setTagInputs([...tagInputs, ""]);
  };

  const handlePostListing = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("Access token not available");
        return;
      }

      const formattedDate = new Date(auctionEnd);

      if (isNaN(formattedDate.getTime())) {
        console.error("Invalid date format");
        return;
      }

      const isoDate = formattedDate.toISOString();
      const listingId = window.location.pathname.split("/").pop();

      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/listings/${listingId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: auctionTitle,
            description: listingDescription,
            tags: tagInputs,
            media: urlInputs,
            endsAt: isoDate,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Listing created:", responseData);
        // Optionally, you can redirect or perform other actions after a successful post
      } else {
        const errorData = await response.json();
        console.error("Error creating listing:", errorData);
      }
    } catch (error) {
      console.error("Error creating listing:", error.message);
    }
  };

  const togglePostModal = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };

  return (
    <>
      {isOpen && (
        <form
          onSubmit={handlePostListing}
          action=" "
          className="flex justify-center bg-black w-full md:max-w-[600px] max-w-[95%] m-auto rounded-sm relative"
        >
          <button
            className="absolute text-white right-6 top-6"
            onClick={toggleModal}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="flex flex-col max-w-[600px] w-full px-4 m-auto">
            <div>
              <h2 className="mx-auto mt-12 mb-16 text-xl text-center text-white md:text-2xl">
                Update your Listing
              </h2>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={auctionTitle}
                onChange={(e) => setAuctionTitle(e.target.value)}
                placeholder="New auction Title.."
                className="block w-full px-4 py-1.5 text-white bg-neutral-900 border-gray-800 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40 tracking-wide"
              />
            </div>

            <div className="mb-2">
              {urlInputs.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="New Listing Avatar URL.."
                    value={url}
                    onChange={(e) => {
                      const updatedUrlInputs = [...urlInputs];
                      updatedUrlInputs[index] = e.target.value;
                      setUrlInputs(updatedUrlInputs);
                    }}
                    className="block w-full px-4 py-1.5 text-white bg-neutral-900 border-gray-800 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40 tracking-wide"
                  />
                  <button
                    type="button"
                    name="add-new-URL"
                    onClick={addNewUrlInput}
                    className="px-2 rounded-sm bg-neutral-900"
                  >
                    <img
                      src={plussIcon}
                      alt=""
                      className="object-center w-6 h-auto"
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-9">
              {tagInputs.map((tag, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="New listing Tag.."
                    value={tag}
                    onChange={(e) => {
                      const updatedTagInputs = [...tagInputs];
                      updatedTagInputs[index] = e.target.value;
                      setTagInputs(updatedTagInputs);
                    }}
                    className="block w-full px-4 py-1.5 text-white bg-neutral-900 border-gray-800 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40 tracking-wide"
                  />
                  <button
                    type="button"
                    name="add-new-tag"
                    onClick={addNewTagInput}
                    className="px-2 rounded-sm bg-neutral-900"
                  >
                    <img
                      src={plussIcon}
                      alt=""
                      className="object-center w-6 h-auto"
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <textarea
                value={listingDescription}
                onChange={(e) => setListingDescription(e.target.value)}
                rows="2"
                placeholder="New listing Description.."
                className="w-full px-4 pt-2 tracking-wide text-white bg-neutral-900"
              ></textarea>
            </div>

            <div className="flex flex-col mb-12">
              <label
                htmlFor="auctionEnd"
                className="mb-2 ml-1 tracking-wide text-white"
              >
                New auction end
              </label>
              <input
                type="datetime-local"
                name="auctionEnd"
                value={auctionEnd}
                onChange={(e) => setAuctionEnd(e.target.value)}
                className="tracking-wide text-white bg-neutral-900 w-[180px] px-2 py-1.5"
              />
            </div>

            <div className="mx-auto mb-12">
              <button
                name="postbtn"
                onClick={handlePostListing}
                className="text-white bg-blue-500 p-1.5 px-2 tracking-wide"
              >
                Publish Listing
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
