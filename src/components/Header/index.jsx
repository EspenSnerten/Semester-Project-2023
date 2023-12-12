import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const BidCoinLogo = "/BidCoin-Logo.png";
  const accessToken = localStorage.getItem("accessToken");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="justify-center w-full pt-6 bg-transparent sm:pt-16">
        <div className="lg:min-w-[1000px] w-5/6 m-auto">
          <div className="flex flex-row w-full">
            <div className="flex flex-row w-full">
              <Link to="/" className="flex ">
                <img
                  className="h-auto my-auto min-w-[150px] max-w-[170px]"
                  src={BidCoinLogo}
                  alt="BidCoin Logo"
                />
              </Link>

              <div className="flex md:justify-end justify-center md:w-full w-[100%] min-w-[50px] my-auto ">
                <div className=" h-0.5 m-auto md:mx-6 mx-4 flex md:w-full w-[100%] bg-white"></div>
                <div className="hidden md:flex">
                  <Link to="/" className="pr-4 text-xl text-white">
                    Home
                  </Link>
                  <Link to="/market" className="pr-4 text-xl text-white">
                    Market
                  </Link>
                  <Link to="/profile" className="pr-4 text-xl text-white">
                    Profile
                  </Link>
                  {accessToken ? (
                    <Link
                      to="/"
                      className="text-xl text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link to="/login" className="text-xl text-white">
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center md:hidden">
              <button
                className="justify-center text-white "
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
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
                ) : (
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
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`absolute z-10 w-full py-5 text-center bg-gradient-to-r from-black via-slate-900 to-black md:hidden border-b-blue-500 mt-2 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to="/"
          className="block p-2 my-2 text-lg text-white"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/market"
          className="block p-2 my-2 text-lg text-white"
          onClick={toggleMobileMenu}
        >
          Market
        </Link>
        <Link
          to="/profile"
          className="block p-2 my-2 text-lg text-white"
          onClick={toggleMobileMenu}
        >
          Profile
        </Link>

        {accessToken ? (
          <Link
            to="/"
            className="block p-2 my-2 text-lg text-white"
            onClick={handleLogout}
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="block p-2 my-2 text-lg text-white"
            onClick={toggleMobileMenu}
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
}
