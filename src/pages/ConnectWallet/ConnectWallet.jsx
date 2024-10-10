/* eslint-disable react/prop-types */
import { useState } from "react";
import RegisterModal from "./RegisterModal";

const ConnectWallet = () => {
  const [registeredModalOpen, setRegisteredModalOpen] = useState(false);

  const handleOpenLink = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android|iPad|iPhone|iPod|windows phone/i.test(userAgent)) {
      // Mobile or tablet
      window.open(
        "https://play.google.com/store/apps/details?id=com.app.PoLink",
        "_blank"
      );
    } else {
      // Laptop or desktop
      window.open(
        "https://chromewebstore.google.com/detail/polink/afeibjjgfjfphjedhdjgbgbhpomolbjm",
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100">
      <div className="space-y-6 w-full px-4 flex flex-col items-center">
        <button
          onClick={handleOpenLink}
          className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
          <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
          <span className="relative text-black text-lg font-bold">
            Create New Wallet
          </span>
        </button>

        <button
          onClick={() => setRegisteredModalOpen(true)} // Open modal on click
          className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105 cursor-pointer"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
          <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
          <span className="relative text-black text-lg font-bold">
            Import Existing Wallet
          </span>
        </button>

        <RegisterModal
          isRegisterOpen={registeredModalOpen}
          setRegisteredModalOpen={setRegisteredModalOpen}
        />
      </div>
    </div>
  );
};

export default ConnectWallet;
