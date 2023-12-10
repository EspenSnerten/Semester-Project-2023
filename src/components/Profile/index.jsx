import React, { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState(""); // State to hold the new avatar URL

  const defaultAvatar = "/defaultprofilepic.png";
  const coinIcon = "/Coin-icon.png";
  const Settings = "/Settings.png";
  const user_name = localStorage.getItem("user_name");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      console.error("Token not found in local storage.");
      setLoading(false);
      return;
    }

    if (!user_name) {
      console.error("User name not found in local storage.");
      setLoading(false);
      return;
    }

    fetch(`https://api.noroff.dev/api/v1/auction/profiles/${user_name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          console.error("Token is invalid or expired.");
          setLoading(false);
          return null;
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData) {
          setProfile(responseData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdateAvatar = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/profiles/${user_name}/media`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: newAvatarUrl,
          }),
        }
      );

      if (response.status === 200) {
        // Update the profile state with the new data
        const responseData = await response.json();
        setProfile(responseData);
      } else {
        console.error("Failed to update avatar:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const toggleFormModal = () => {
    setIsFormModalOpen(!isFormModalOpen);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-2 mx-auto max-w-7xl">
      {isFormModalOpen && (
        <div className="absolute z-10 m-auto bg-black px-9 py-9">
          <form onSubmit={handleUpdateAvatar} className="flex flex-col gap-4">
            <div className="flex flex-row justify-end mb-1">
              <button className="text-white " onClick={toggleFormModal}>
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
            </div>
            <input
              type="text"
              placeholder="New profile Avatar URL.."
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              className="w-[320px] block  px-4 py-1.5 text-white bg-neutral-900 border-gray-800 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <button
              type="submit"
              className="px-3 py-1 mx-auto text-white transition-all duration-300 bg-blue-600 rounded-sm hover:scale-105"
            >
              Update Avatar
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : profile ? (
        <div className="flex flex-col md:w-[540px] max-w-[540px] w-[90%] py-9 bg-black/25 backdrop-blur-sm rounded-sm">
          <div className="flex flex-col justify-start w-full">
            <h2 className="mx-auto mb-4 text-2xl font-normal tracking-wide text-white">
              {profile.name}
            </h2>
          </div>
          <div className="flex flex-col justify-center w-full gap-4">
            <div className="relative w-full">
              <img
                src={profile.avatar || defaultAvatar}
                alt={`${profile.name}'s profile picture`}
                loading="lazy"
                className="object-cover m-auto rounded md:w-[400px] w-[85%] h-[300px]"
              />
              <button
                className="absolute bottom-0 p-2 text-white bg-black rounded-bl-[3.1px] rounded-tr-md md:left-[13%] left-[7.5%]"
                onClick={toggleFormModal}
              >
                <img
                  src={Settings}
                  alt=""
                  className="h-5 transition-all ease-in-out hover:animate-spin "
                />
              </button>
            </div>
            <div className="flex flex-row justify-center gap-2">
              <p className="flex text-white">
                <img src={coinIcon} alt="" className="flex h-4 m-auto mr-1" />{" "}
                {profile.credits}
              </p>
              <p className="text-white">|</p>
              <p className="text-white">
                Owned items: {profile.wins.length || 0}
              </p>
              <p className="text-white">|</p>
              <p className="text-white">
                Listings: {profile._count?.listings ?? 0}
              </p>
            </div>
            <div className="flex p-2 m-auto w-[70%] md:w-[385px]">
              <p className="font-light tracking-wide text-white">
                The given API comes with constraints that prevent any
                modifications or alterations to the user description.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white">You need to log in to view this profile</p>
      )}
    </main>
  );
}

export default Profile;
