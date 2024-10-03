import { Link } from "react-router-dom";
import UvitokenLogo from "../assets/UvitokenLogo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userAddressFromState = useSelector((state)=>state?.wallet?.userAddress);
  
  return (
    <div className="navbar bg-gray-900 shadow-lg px-2 md:px-4 py-4 flex flex-row items-center justify-between">
      <div className="flex items-center">
        <img
          src={UvitokenLogo}
          alt="Uvitoken"
          className="w-10 h-10 md:w-12 md:h-12 mr-2"
        />{" "}
        {/* Responsive logo size */}
        <span className="text-base md:text-xl text-white font-bold">
          UVI TOKEN
        </span>
      </div>
      <div className="flex-none">
        <Link
          to="/wallet"
          className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span
            className="w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 
            group-hover:from-green-400 group-hover:via-yellow-400 group-hover:to-pink-400 
            absolute"
          ></span>
          <span
            className="relative px-2 py-1 md:px-6 md:py-3 transition-all ease-out bg-gray-900 rounded-md 
            group-hover:bg-opacity-0 duration-400"
          >
            <span className="relative text-white group-hover:text-black transition duration-300 text-sm md:text-base">
             {userAddressFromState? userAddressFromState:" Connect Wallet"}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
