import { Link } from "@tanstack/react-router";

export default function LoginRegisterHeader() {
  const BidCoinLogo = "/BidCoin-Logo.png";

  return (
    <>
      <header className="flex flex-row justify-center w-full py-6 bg-transparent">
        <div className="flex flex-row justify-center w-5/6 ">
          <div className="w-full mr-9 h-0.5 my-auto bg-white"></div>
          <Link to="/" className="flex w-[300px]">
            <img className="h-auto my-auto min-w-[150px] max-w-[170px]" src={BidCoinLogo} alt="BidCoin Logo" />
          </Link>
          <div className="w-full h-0.5 my-auto ml-9 bg-white"></div>
        </div>
      </header>
    </>
  );
}
