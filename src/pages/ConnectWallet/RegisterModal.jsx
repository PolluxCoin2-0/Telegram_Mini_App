/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import polluxWeb from "polluxweb";
import {
  getCloudStorageData,
  setCloudStorageData,
} from "../../utils/TelegramCloud";
import { postLogin } from "../../utils/api";
import { decryptString, encryptStringWithPin } from "../../utils/Encryption";
import { toast } from "react-toastify";

const RegisterModal = ({ isRegisterOpen, setRegisteredModalOpen }) => {
  const [OpenRegister, setOpenRegister] = useState(""); // Yes or No state
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleImport = async (walletData) => {
    const PolluxWeb = new polluxWeb({
      fullHost: "https://exchangefullnode.poxscan.io/",
      privateKey: walletData,
    });
    const encryptPin = await getCloudStorageData("encrypted");
    if (encryptPin) {
      const importWalletData = await PolluxWeb.address.fromPrivateKey(
        walletData
      );

      console.log(importWalletData);

      const dataObj = await postLogin(importWalletData);
      console.log("dataObj Import", dataObj?.data);

      if (dataObj?.data) {
        let walletDataStore =
          JSON.parse(sessionStorage.getItem("dataObj")) || {};
        walletDataStore[importWalletData] = dataObj?.data;
        sessionStorage.setItem("dataObj", JSON.stringify(walletDataStore));

        // Store user address in sessionStorage (array form)
        let addresses =
          JSON.parse(sessionStorage.getItem("userAddresses")) || [];
        addresses.push(importWalletData);
        sessionStorage.setItem("userAddresses", JSON.stringify(addresses));

        const pin = decryptString(encryptPin);
        const encryptedWalletAddress = encryptStringWithPin(
          importWalletData,
          pin
        );
        const encryptPrivateKey = encryptStringWithPin(walletData, pin);
        // Fetch existing wallet data from cloud storage
        let existingWalletData = await getCloudStorageData("userData");

        // Ensure existingWalletData is an array
        if (existingWalletData) {
          try {
            existingWalletData = JSON.parse(existingWalletData); // Parse if it's a string
          } catch (error) {
            existingWalletData = []; // Reset to empty array if parsing fails
          }
        } else {
          existingWalletData = []; // If no existing data, initialize as an empty array
        }

        // Save the updated array back to cloud storage
        existingWalletData.push({
          walletAddress: encryptedWalletAddress,
          privateKey: encryptPrivateKey,
          originalWalletAddress: importWalletData,
        });

        await setCloudStorageData(
          "userData",
          JSON.stringify(existingWalletData)
        );
        navigate("/");
        window.location.reload();
      } else {
        toast.error("This wallet is not registered. Please register");
      }

      console.log("all user data", await getCloudStorageData("userData"));
      console.log(
        "all user addresses",
        JSON.parse(sessionStorage.getItem("userAddresses"))
      );
      console.log(
        "all user dataobj",
        JSON.parse(sessionStorage.getItem("dataObj"))
      );
    }
  };

  // Function to handle closing the modal and navigating back
  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  const handleRegisterCloseModal = () => {
    setRegisteredModalOpen(!isRegisterOpen);
  };

  return (
    <div
      className={`fixed inset-0 p-2 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isRegisterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-8 rounded-3xl shadow-lg transition-transform duration-300 transform ${
          isRegisterOpen ? "scale-100" : "scale-95"
        }`}
      >
        <p
          className="flex flex-row justify-end -mt-4 -mr-4 pb-1 cursor-pointer"
          onClick={handleRegisterCloseModal} // Add the click handler here
        >
          <RxCross1 />
        </p>
        <h2 className="text-xl font-bold mb-4 text-center">
          Are you already registered or not?
        </h2>

        <div className="flex flex-row justify-around">
          <button
            onClick={() => {
              setOpenRegister("yes");
              setModalOpen(true);
            }}
            className="relative inline-flex items-center justify-center w-full max-w-[8rem] p-2 px-4 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
            <span className="absolute bottom-0 right-0 block w-32 h-32 mb-20 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-12 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
            <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
            <span className="relative text-black text-sm font-bold">Yes</span>
          </button>

          <button
            onClick={() => {
              setOpenRegister("no");
              setModalOpen(true);
            }}
            className="relative inline-flex items-center justify-center w-full max-w-[8rem] p-2 px-4 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
            <span className="absolute bottom-0 right-0 block w-32 h-32 mb-20 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-12 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
            <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
            <span className="relative text-black text-sm font-bold">No</span>
          </button>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onImport={handleImport}
          isRegistered={OpenRegister} // Pass the "yes" or "no" state
        />
      </div>
    </div>
  );
};

export default RegisterModal;
