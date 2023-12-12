import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@tanstack/react-router";
import Search from "../Search";
import Sort from "../Sort";
import CreatePost from "../CreatePost";

const UserItems = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("created-desc");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const defaultAvatar = "/defaultprofilepic.png";
  const defaultImg = "/default-placeholder.png";
  const plussIcon = "/Pluss-icon.png";
  const ArrowIcon = "/Arrow-icon.png";
  const CoinIcon = "/Coin-icon.png";
  const TimeIcon = "/Time-icon.png";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = localStorage.getItem("user_name");
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `https://api.noroff.dev/api/v1/auction/profiles/${userName}/listings?_bids=true&_seller=true&sort=created&sortOrder=desc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setListings(response.data);

        if (token) {
          const profileResponse = await fetch(
            `https://api.noroff.dev/api/v1/auction/profiles/${userName}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const userProfileData = await profileResponse.json();
          setUserProfile(userProfileData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);

    // Sorting logic
    let sortedListingsCopy = [...listings];

    switch (newSortOption) {
      case "created-desc":
        sortedListingsCopy.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        break;
      case "created-asc":
        sortedListingsCopy.sort(
          (a, b) => new Date(a.created) - new Date(b.created)
        );
        break;
      case "bids-desc":
        sortedListingsCopy.sort((a, b) => b._count.bids - a._count.bids);
        break;
      case "time-left-desc":
        sortedListingsCopy.sort(
          (a, b) => new Date(b.endsAt) - new Date(a.endsAt)
        );
        break;
      default:
        break;
    }

    setListings(sortedListingsCopy);
  };

  const togglePostModal = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };

  const toggleSortModal = () => {
    setIsSortModalOpen(!isSortModalOpen);
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/listings/${listingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedListings = listings.filter(
          (item) => item.id !== listingId
        );
        setListings(updatedListings);
      } else {
        console.error("Failed to delete listing. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full px-2 mb-12">
      <div className="flex sm:flex-row flex-col max-w-[1088px] w-full mx-auto mb-2">
        <div className="flex justify-center sm:justify-start w-full sm:w-[40%]">
          <Search onSearchChange={handleSearchChange} />
        </div>

        <div className="flex justify-end gap-2 w-[340px] mx-auto sm:w-full sm:justify-end">
          {localStorage.getItem("accessToken") &&
          localStorage.getItem("user_name") ? (
            <div className="flex">
              <button
                className="flex px-3 text-white transition-all duration-200 ease-in rounded-sm bg-black/40 hover:bg-blue-500"
                onClick={togglePostModal}
              >
                <span className="hidden my-auto mr-2 text-sm tracking-wide md:flex sm:text-base">
                  Create a Listing
                </span>
                <img
                  src={plussIcon}
                  alt=""
                  className="sm:w-3.5 w-2.5 my-auto object-cover"
                />
              </button>
              <div className="absolute left-0 z-20 w-full top-20">
                <CreatePost
                  isOpen={isPostModalOpen}
                  toggleModal={togglePostModal}
                />
              </div>
            </div>
          ) : null}

          {localStorage.getItem("accessToken") &&
          localStorage.getItem("user_name") ? (
            <div className="flex gap-2">
              <div className="flex py-1.5 px-3 text-white bg-black/40 rounded-sm max-w-[155px] truncate">
                <img
                  src={userProfile.avatar || defaultAvatar}
                  alt={`${userProfile.name}'s profile picture`}
                  className="object-cover w-5 h-5 my-auto mr-2 rounded-full sm:w-6 sm:h-6"
                />
                <p className="text-sm tracking-wide truncate sm:text-base">
                  {userProfile.name}
                </p>
              </div>

              <div className="flex py-1.5 px-3 text-white bg-black/40 rounded-sm ">
                <img src={CoinIcon} alt="" className="w-4 h-4 my-auto mr-2" />
                <p className="my-auto text-sm tracking-wide truncate sm:text-base">
                  {userProfile.credits}
                </p>
              </div>
            </div>
          ) : null}

          <div className="relative flex flex-col">
            <button
              className="flex px-3 py-1.5 my-auto tracking-wide text-white bg-black/40 text-sm sm:text-base transition-all duration-200 ease-in hover:bg-black"
              onClick={toggleSortModal}
            >
              <span className="flex gap-2 my-auto mr-2">
                Sort <span className="hidden sm:flex">By</span>
              </span>{" "}
              <img
                src={ArrowIcon}
                alt=""
                className=" my-auto rotate-[270deg] w-2"
              />
            </button>
            <div className="absolute z-10 right-[0px] top-[40px] w-[150px]">
              <Sort
                onSortChange={handleSortChange}
                isOpen={isSortModalOpen}
                toggleModal={toggleSortModal}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 m-auto justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1100px] w-full">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:w-[250px] w-full max-w-[340px] bg-black/20 m-2 backdrop-blur-sm hover:scale-105 transition-all duration-200 ease-in"
          >
            <Link to={`/item/${item.id}`} className="flex flex-col">
              <div>
                <img
                  src={item.media[0] || defaultImg}
                  alt={item.title}
                  className="object-cover w-full mb-2 h-[150px]"
                />
              </div>

              <div className="px-3 pb-4">
                <div className="flex flex-row my-4">
                  <img
                    src={item.seller.avatar || defaultAvatar}
                    alt={`${item.seller.name}'s profile picture`}
                    className="object-cover w-6 h-6 mr-2 rounded-full"
                  />
                  <p className="my-auto text-white">{item.seller.name}</p>
                </div>

                <div>
                  <h2 className="mb-2 text-lg text-white max-w-[150px] truncate">
                    {item.title}
                  </h2>
                </div>

                <div className="flex mb-3">
                  <img
                    src={TimeIcon}
                    alt="Icon of a timeglass"
                    className="w-3.5 h-3.5 my-auto mr-1.5"
                  />
                  <p className="text-sm text-white">
                    Ends at: {new Date(item.endsAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex mb-6">
                  <img
                    src={CoinIcon}
                    alt="Icon of a coin"
                    className="w-4 h-4 my-auto mr-1.5"
                  />
                  <p className="text-sm text-white">
                    Current highest bid:&nbsp;{" "}
                    {item.bids.length > 0
                      ? item.bids.reduce((maxBid, currentBid) => {
                          return currentBid.amount > maxBid.amount
                            ? currentBid
                            : maxBid;
                        }, item.bids[0]).amount
                      : "0"}
                    ,-
                  </p>
                </div>

                <div className="mb-1">
                  <p className="px-2 text-white truncate bg-black rounded-sm w-fit max-w-[180px]">
                    {item.tags}
                  </p>
                </div>
              </div>
            </Link>
            <div className="px-3 mb-3">
              <button
                className="flex px-2 py-1 text-sm tracking-wide text-white transition-all ease-in-out bg-black hover:bg-red-800 "
                onClick={() => handleDeleteListing(item.id)}
              >
                Delete Listing{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserItems;
