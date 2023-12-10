import { Link } from "@tanstack/react-router";

export default function Index() {
  return (
    <>
      <main className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="flex flex-col justify-center px-3">
          <h1 className="text-center m-auto mb-14 tracking-widest text-white md:text-[40px] text-[30px]">
            Welcome to the future of trading
          </h1>
          <p className="m-auto mb-8 tracking-widest text-white md:max-w-[606px] max-w-[450px] px-6 text-center md:text-lg text-base	">
            With BidCoin you can trade for a vast selection of items, we believe
            in the power of freedom when it comes to the currency we have
            created, on this platform you are free to trade without the
            centralized power of Big Capital
          </p>
          <p className="m-auto mb-12 text-base tracking-widest text-center text-white md:text-lg">
            On BidCoin you are the BOSS
          </p>
          <Link
            to="/register"
            className="relative inline-flex items-center justify-center py-3 m-auto mb-12 overflow-hidden text-lg font-medium text-white transition duration-300 ease-out bg-black rounded-sm shadow-md md:text-2xl px-7 group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Sign up now
            </span>
            <span className="relative invisible">Button Text</span>
          </Link>
        </div>
      </main>
    </>
  );
}
