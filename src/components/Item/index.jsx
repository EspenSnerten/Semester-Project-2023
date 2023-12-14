import React, { useState, useEffect } from "react";
import axios from "axios";
import Bid from "../Bid";
import UpdatePost from "../UpdatePost";

const Item = () => {
  const [itemData, setItemData] = useState(null);
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const coinIcon = "/Coin-icon.png";
  const timeIcon = "/Time-icon.png";
  const SettingIcon = "/Settings.png";

  const handleUpdatePostSuccess = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const listingId = window.location.pathname.split("/").pop();

        if (listingId) {
          const response = await axios.get(
            `https://api.noroff.dev/api/v1/auction/listings/${listingId}/?_bids=true&_seller=true`
          );

          setItemData(response.data);
        } else {
          console.error("Listing ID is null");
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const checkTokenAndSeller = () => {
      const accessToken = localStorage.getItem("accessToken");
      setIsTokenPresent(!!accessToken);
    };

    fetchItemData();
    checkTokenAndSeller();
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? itemData.media.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === itemData.media.length - 1 ? 0 : prevSlide + 1
    );
  };

  const toggleUpdateModal = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };

  return (
    <section className="flex justify-center w-full min-h-screen px-2 py-4 sm:p-2 sm: ">
      {itemData ? (
        <div className="flex flex-col p-6 m-auto bg-black/25 backdrop-blur-sm">
          <div className="carousel max-w-[550px] w-full h-auto">
            {itemData.media.map((imageUrl, index) => (
              <div
                key={index}
                className={`relative w-full carousel-item ${
                  index === currentSlide ? "visible" : "hidden"
                }`}
              >
                <img src={imageUrl} className="block w-full" />
                <div className="absolute left-0 right-0 flex justify-between transform -translate-y-1/2 top-1/2">
                  <button
                    onClick={() => goToPrevSlide()}
                    className="px-4 py-3 transition-all duration-200 ease-in-out border-none rounded-r-lg text-white/100 bg-black/20 hover:bg-blue-500"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => goToNextSlide()}
                    className="px-4 py-3 transition-all duration-200 ease-in-out border-none rounded-l-lg bg-black/20 text-white/100 hover:bg-blue-500"
                  >
                    ❯
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col ml-2 max-w-[550px]">
            <div className="mt-4">
              <h2 className="text-2xl text-white">{itemData.title}</h2>
            </div>

            <div className="flex flex-row my-4">
              <img
                src={itemData.seller.avatar}
                alt={`${itemData.seller.name}'s profile picture`}
                className="object-cover w-8 h-8 mr-2 rounded-full"
              />
              <p className="my-auto text-white">{itemData.seller.name}</p>
            </div>

            <div className="flex flex-col gap-4 mb-3 sm:flex-row">
              <p className="flex tracking-wide text-white">
                <img src={timeIcon} alt="" className="h-[17px] my-auto mr-1" />
                Ends at:&nbsp; {new Date(itemData.endsAt).toLocaleDateString()}
              </p>
              <p className="flex tracking-wide text-white">
                <img
                  src={coinIcon}
                  alt="coin icon"
                  className="h-[18px] my-auto mr-1"
                />
                Current highest bid: &nbsp;
                {itemData.bids.length > 0
                  ? itemData.bids.reduce((maxBid, currentBid) => {
                      return currentBid.amount > maxBid.amount
                        ? currentBid
                        : maxBid;
                    }, itemData.bids[0]).amount
                  : "0"}
                ,-
              </p>
            </div>

            <div className="">
              <p className="px-2 text-white truncate bg-black rounded-sm w-fit max-w-[280px]">
                {itemData.tags}
              </p>
            </div>

            <div className="mt-9">
              <p className="tracking-wide text-white">{itemData.description}</p>
            </div>

            <div className="my-6">
              <p className="tracking-wide text-white">
                Number of Bids: &nbsp;{itemData._count.bids}
              </p>
            </div>

            <div className="mb-4">
              {isTokenPresent &&
                itemData.seller.name !== localStorage.getItem("user_name") && (
                  <Bid />
                )}
            </div>

            <div className="relative w-full">
              {itemData.seller.name === localStorage.getItem("user_name") && (
                <button
                  className="absolute top-[-24px] p-3 text-white rounded-sm right-[-24px] bg-black/40"
                  onClick={toggleUpdateModal}
                >
                  <img
                    src={SettingIcon}
                    alt="an icon of a gear"
                    className="w-6 h-6 transition-all ease-in-out hover:animate-spin"
                  />
                </button>
              )}
              <div className="relative">
                <div className="fixed bottom-0 right-0 w-full">
                  {itemData.seller.name ===
                    localStorage.getItem("user_name") && (
                    <UpdatePost
                      isOpen={isPostModalOpen}
                      toggleModal={toggleUpdateModal}
                      onSuccess={handleUpdatePostSuccess}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default Item;
