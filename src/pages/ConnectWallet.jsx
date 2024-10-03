import polluxWeb from "polluxweb";
import { useState } from "react";
import { decryptString, encryptStringWithPin } from "../utils/Encryption";
import { useDispatch } from "react-redux";
import { setUserAddress } from "../redux/slice";
import { setCloudStorageData } from "../utils/TelegramCloud";

const PolluxWeb = new polluxWeb({
    fullHost: 'https://exchangefullnode.poxscan.io/',
  });

// Modal component
const Modal = ({ isOpen, onClose, onImport }) => {
    const [walletData, setWalletData] = useState("");
    const [error, setError] = useState(""); // State for error message
  
    const handleImport = () => {
      if (!walletData) {
        setError("Enter your private key!"); // Set error message if input is empty
        return; // Prevent further execution
      }
      setError(""); // Clear any previous error
      onImport(walletData);
      onClose(); // Close the modal after importing
    };
  
    return (
      <div className={`fixed inset-0 p-2 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className={`bg-white p-8 rounded-3xl shadow-lg transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-95"}`}>
          <h2 className="text-2xl font-bold mb-4 text-center">Import Existing Wallet</h2>
          
          {/* Error message */}
          {error && <p className="text-red-500 text-sm text-left mb-2">{error}</p>}
          
          <input
            type="text"
            value={walletData}
            onChange={(e) => setWalletData(e.target.value)}
            placeholder="Enter wallet data"
            className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <div className="flex justify-center space-x-4">
          <button
            onClick={handleImport}
            className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out
             rounded-xl shadow-lg group hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-xl opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500
             rounded-xl opacity-20 group-hover:rotate-90 ease"></span>
            <span className="absolute inset-0 w-full h-full rounded-xl bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
            <span className="relative text-black text-lg font-bold">Import</span>
          </button>

            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400 transition duration-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

const ConnectWallet = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const encryptPin = sessionStorage.getItem('encrypted');
  const dispatch = useDispatch();

  const polluxfunc = async () => {       
    const account = await PolluxWeb.createAccount();
    if(encryptPin){
      dispatch(setUserAddress(account.address.base58))
      const pin = decryptString(encryptPin);
      const encryptedWalletAddress = encryptStringWithPin(account.address.base58, pin)
      const encryptPrivateKey = encryptStringWithPin(account?.privateKey, pin)
     await setCloudStorageData("userData",{
        walletAddress: encryptedWalletAddress,
        privateKey: encryptPrivateKey,
        originalWalletAddress: account.address.base58,
      })
    }
  };

  const handleImport = async(walletData) => {
  const importWalletData = await PolluxWeb.address.fromPrivateKey(walletData);
  if(encryptPin){
    dispatch(setUserAddress(importWalletData))
    const pin = decryptString(encryptPin);
    const encryptedWalletAddress = encryptStringWithPin(importWalletData, pin)
    const encryptPrivateKey = encryptStringWithPin(walletData, pin)
    await setCloudStorageData("userData",{
      walletAddress: encryptedWalletAddress,
      privateKey: encryptPrivateKey,
      originalWalletAddress: importWalletData,
    })
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100">
      <div className="space-y-6 w-full px-4 flex flex-col items-center">
        <button
        onClick={polluxfunc}
          className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
          <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
          <span className="relative text-black text-lg font-bold">Create New Wallet</span>
        </button>

        <button
          onClick={() => setModalOpen(true)} // Open modal on click
          className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105 cursor-pointer"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
          <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
          <span className="relative text-black text-lg font-bold">Import Existing Wallet</span>
        </button>

        {/* Modal for importing wallet */}
        <Modal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onImport={handleImport} 
        />
      </div>
    </div>
  );
};

export default ConnectWallet;
