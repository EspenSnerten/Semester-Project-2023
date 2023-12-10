export default function Footer() {
  const BidCoinLogo = "/BidCoin-Logo.png";

  return (
    <>
      <footer className="flex flex-row justify-center w-full py-6 bg-gradient-to-r from-black via-slate-900 to-black">
        <div className="flex flex-row justify-center w-5/6 ">
          <div className="w-full  h-0.5 my-auto bg-white"></div>
          <img className="mx-5 h-7" src={BidCoinLogo} alt="BidCoin Logo" />
          <div className="w-full  h-0.5 my-auto bg-white"></div>
        </div>
      </footer>
    </>
  );
}
