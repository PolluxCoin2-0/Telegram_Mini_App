import { Link } from "react-router-dom";
import UvitokenLogo from "../assets/UvitokenLogo.png";
import { useEffect, useState } from "react";
import { getCloudStorageData } from "../utils/TelegramCloud";

const Navbar = ({userAddressPresent}) => {
  const dummyWalletAddress = [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000001",
    "0x0000000000000000000000000000000000000002",
    "0x0000000000000000000000000000000000000003",
  ]
  console.log("navbar", userAddressPresent)
  const [userAddressFromState, setUserAddressFromState] = useState(() => {
    return sessionStorage.getItem('userAddress') || ""; // Set default value from sessionStorage
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleWalletClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };
  
  useEffect(()=>{
    const fetchData = async()=>{
      const storedUserAddressPresent = await getCloudStorageData('userData');
      setUserAddressFromState(storedUserAddressPresent?.originalWalletAddress);
    }
    fetchData();
  },[userAddressPresent])

  return (
    <div className="navbar bg-gray-900 shadow-lg px-2 md:px-4 py-4 flex flex-row items-center justify-between">
      <Link to="/">
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
      </Link>
      <div className="flex-none">
        <Link
         onClick={handleWalletClick}
          // to="/wallet"
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
             {/* {userAddressFromState? userAddressFromState:" Connect Wallet"} */}
             <span className="relative text-white group-hover:text-black transition duration-300 text-sm md:text-base">
              {userAddressFromState
              ? `${userAddressFromState.slice(0,11)}...${userAddressFromState.slice(-6)}  `
                : "Connect Wallet"}
            </span>
          </span>
        </Link>

         {/* Dropdown list */}
         {isDropdownOpen && (
          <div className="absolute top-14 mt-2 right-0 bg-gray-800 border border-gray-600 rounded-md shadow-lg w-48">
            <ul className="text-white text-sm md:text-base">
              {dummyWalletAddress.map((address, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setUserAddressFromState(address);
                    setIsDropdownOpen(false); // Close dropdown after selection
                  }}
                >
                  {address.slice(0, 8)}...{address.slice(-10)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
