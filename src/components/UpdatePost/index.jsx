import React, { useState, useEffect } from "react";

export default function UpdatePost({ isOpen, toggleModal, onSuccess }) {
  const imgIcon = "/img-icon.png";
  const plussIcon = "/Pluss-icon.png";
  const SuccessIcon = "/Success-icon.png";

  const [urlInputs, setUrlInputs] = useState([""]);
  const [tagInputs, setTagInputs] = useState([""]);
  const [auctionTitle, setAuctionTitle] = useState("");
  const [listingDescription, setListingDescription] = useState("");
  const [auctionEnd, setAuctionEnd] = useState("");

  const [titleError, setTitleError] = useState("");
  const [urlErrors, setUrlErrors] = useState([]);
  const [tagErrors, setTagErrors] = useState([]);
  const [descriptionError, setDescriptionError] = useState("");
  const [auctionEndError, setAuctionEndError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const addNewUrlInput = () => {
    setUrlInputs([...urlInputs, ""]);
    setUrlErrors([...urlErrors, ""]);
  };

  const addNewTagInput = () => {
    setTagInputs([...tagInputs, ""]);
    setTagErrors([...tagErrors, ""]);
  };

  const handleTitleChange = (e) => {
    setAuctionTitle(e.target.value);
    setTitleError(e.target.value.trim() ? "" : "Title is required");
  };

  const handleUrlChange = (index, value) => {
    const updatedUrlInputs = [...urlInputs];
    updatedUrlInputs[index] = value;
    setUrlInputs(updatedUrlInputs);
    setUrlErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = value.trim() ? "" : "URL is required";
      return newErrors;
    });
  };

  const handleTagChange = (index, value) => {
    const updatedTagInputs = [...tagInputs];
    updatedTagInputs[index] = value;
    setTagInputs(updatedTagInputs);
    setTagErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = value.trim() ? "" : "Tag is required";
      return newErrors;
    });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setListingDescription(value);
    setDescriptionError(
      value.length <= 280 ? "" : "Description exceeds 280 characters"
    );
  };

  const handleAuctionEndChange = (e) => {
    const value = e.target.value;
    setAuctionEnd(value);
    setAuctionEndError(value ? "" : "Auction end is required");
  };

  const handlePostListing = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Validation checks
      if (!auctionTitle.trim()) {
        setTitleError("Title is required");
        return;
      }

      let urlErrorsArray = [];
      urlInputs.forEach((url) => {
        urlErrorsArray.push(url.trim() ? "" : "URL is required");
      });
      setUrlErrors(urlErrorsArray);
      if (urlErrorsArray.some((error) => error !== "")) {
        return;
      }

      let tagErrorsArray = [];
      tagInputs.forEach((tag) => {
        tagErrorsArray.push(tag.trim() ? "" : "Tag is required");
      });
      setTagErrors(tagErrorsArray);
      if (tagErrorsArray.some((error) => error !== "")) {
        return;
      }

      if (listingDescription.length > 280) {
        setDescriptionError("Description exceeds 280 characters");
        return;
      }

      if (!auctionEnd) {
        setAuctionEndError("Auction end is required");
        return;
      }

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
        setSuccessMessageVisible(true);

        setTimeout(() => {
          toggleModal();
          setSuccessMessageVisible(false);

          onSuccess();
        }, 2500);
      } else {
        const errorData = await response.json();
        console.error("Error creating listing:", errorData);
      }
    } catch (error) {
      console.error("Error creating listing:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {isOpen && (
        <form
          onSubmit={handlePostListing}
          action=" "
          className="flex justify-center bg-black/[99%] w-full md:max-w-[600px] m-auto rounded-sm relative"
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
          <div className="flex flex-col max-w-[450px] w-full px-4 m-auto">
            <div>
              <h2 className="mx-auto mb-16 text-2xl text-center text-white mt-9">
                Your Listing
              </h2>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={auctionTitle}
                onChange={handleTitleChange}
                placeholder="New auction Title.."
                className="block w-full px-4 py-1.5 text-white bg-black border-zinc-900 border-2 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40 tracking-wide"
              />
              {titleError && (
                <small className="ml-2 text-red-600">{titleError}</small>
              )}
            </div>

            <div className="mb-2">
              {urlInputs.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="New listing Avatar URL.."
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    className="block w-full px-4 py-1.5 text-white bg-black border-zinc-900 border-2 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40 tracking-wide"
                  />
                  <button
                    type="button"
                    name="add-new-URL"
                    onClick={addNewUrlInput}
                    className="px-2 bg-black border-2 rounded-sm border-zinc-900"
                  >
                    <img
                      src={plussIcon}
                      alt=""
                      className="object-center w-6 h-auto"
                    />
                  </button>
                  {urlErrors[index] && (
                    <small className="ml-2 text-red-600">{urlErrors[index]}</small>
                  )}
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
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="block w-full px-4 py-1.5 text-white bg-black border-zinc-900 border-2 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40 tracking-wide"
                  />
                  <button
                    type="button"
                    name="add-new-tag"
                    onClick={addNewTagInput}
                    className="px-2 bg-black border-2 rounded-sm border-zinc-900"
                  >
                    <img
                      src={plussIcon}
                      alt=""
                      className="object-center w-6 h-auto"
                    />
                  </button>
                  {tagErrors[index] && (
                    <small className="ml-2 text-red-600">{tagErrors[index]}</small>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <textarea
                value={listingDescription}
                onChange={handleDescriptionChange}
                rows="2"
                placeholder="New Listing description.."
                className="w-full px-4 pt-2 tracking-wide text-white bg-black border-2 rounded-sm border-zinc-900 focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
              ></textarea>
              {descriptionError && (
                <small className="ml-2 text-red-600">{descriptionError}</small>
              )}
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
                required
                name="auctionEnd"
                value={auctionEnd}
                onChange={handleAuctionEndChange}
                className="tracking-wide text-white bg-black border-zinc-900 border-2 w-[180px] px-2 py-1.5 focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {auctionEndError && (
                <small className="mt-1 ml-1 text-red-600">{auctionEndError}</small>
              )}
            </div>

            <div className="mx-auto mb-12">
              <button
                name="postbtn"
                onClick={handlePostListing}
                className="flex text-white bg-blue-500 p-1.5 px-2 tracking-wide relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="my-auto mr-2 loading loading-ring loading-sm"></span>
                    Updating ...
                  </>
                ) : (
                  "Update Listing "
                )}
              </button>
            </div>

            {successMessageVisible && (
              <div className="absolute bottom-0 right-0 justify-center w-full h-full text-center text-white bg-black rounded-sm">
                <div className="flex flex-col justify-center h-full gap-4">
                  <img
                    src={SuccessIcon}
                    alt=""
                    className="w-[100px] h-auto mx-auto"
                  />
                  <p className="mx-auto">Update Successful</p>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
    </>
  );
}
