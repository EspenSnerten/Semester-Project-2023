import { Link } from "@tanstack/react-router";

export default function LoginRegisterHeader() {
  const BidCoinLogo = "/BidCoin-Logo.png";

  return (
    <>
      <footer className="flex flex-row justify-center w-full py-6 bg-transparent">
        <div className="flex flex-row justify-center w-5/6 ">
          <div className="w-full  h-0.5 my-auto bg-white"></div>
          <Link to="/" className="flex ">
            <img className="mx-5 h-7" src={BidCoinLogo} alt="BidCoin Logo" />
          </Link>
          <div className="w-full  h-0.5 my-auto bg-white"></div>
        </div>
      </footer>
    </>
  );
}
