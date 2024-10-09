/* eslint-disable react/prop-types */
import polluxWeb from "polluxweb";
import { useEffect, useState } from "react";
import { decryptString, encryptStringWithPin } from "../utils/Encryption";
import {
  getCloudStorageData,
  setCloudStorageData,
} from "../utils/TelegramCloud";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {
  postLogin,
  postOTPVerify,
  postSetReferrer,
  postSignup,
  postVerifyReferral,
} from "../utils/api";
import { toast } from "react-toastify";

const RegisteredModal = ({ isRegisterOpen, setRegisteredModalOpen }) => {
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
      
      let walletDataStore = JSON.parse(sessionStorage.getItem("dataObj")) || {};
      walletDataStore[importWalletData] = dataObj?.data;
      sessionStorage.setItem("dataObj", JSON.stringify(walletDataStore));

      // Store user address in sessionStorage (array form)
      let addresses = JSON.parse(sessionStorage.getItem("userAddresses")) || [];
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

      await setCloudStorageData("userData", JSON.stringify(existingWalletData));

      console.log("all user data", await getCloudStorageData("userData"));
      console.log(
        "all user addresses",
        JSON.parse(sessionStorage.getItem("userAddresses"))
      );
      console.log(
        "all user dataobj",
        JSON.parse(sessionStorage.getItem("dataObj"))
      );
      navigate("/");
      window.location.reload();
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

// Modal component
const Modal = ({ isOpen, onClose, onImport, isRegistered }) => {
  const [walletData, setWalletData] = useState("");
  const [email, setEmail] = useState("");
  const [enteredReferralAddress, setEnteredReferralAddress] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleImport = () => {
    if (!walletData) {
      setError("Enter your private key!"); // Set error message if input is empty
      return; // Prevent further execution
    }
    setError(""); // Clear any previous error
    onImport(walletData);
    onClose(); // Close the modal after importing
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNewRegister = async (e) => {
    e.preventDefault();

    if (!email || walletData.length === 0) {
      toast.error("Please enter your email and wallet address!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    try {
      
      const PolluxWeb = new polluxWeb({
        fullHost: "https://exchangefullnode.poxscan.io/",
        privateKey: walletData,
      });

      const importWalletData = await PolluxWeb.address.fromPrivateKey(
        walletData
      );
      const apiData = await postSignup(
        importWalletData,
        email,
        enteredReferralAddress
      );

      console.log({ apiData });

      if (apiData?.data === "Invalid Referral Code") {
        // toast.error("Invalid Referral Code");
        return;
      }

      if (apiData?.data === "WalletAddress Already Exist") {
        // toast.error("WalletAddress Already Exist");
        return;
      }

      if (apiData?.data?.d?.email) {
        const apiDataOfOTP = await postOTPVerify(email, apiData?.data?.d?.otp);
        console.log({ apiDataOfOTP });

        if (apiDataOfOTP?.data?._id) {
          if (enteredReferralAddress) {
            const setReferrerdata = await postSetReferrer(
              importWalletData,
              enteredReferralAddress
            );
            console.log(setReferrerdata);

            const signTransaction = await PolluxWeb.trx.sign(
              setReferrerdata?.data?.transaction
            );
            console.log("signTransaction", signTransaction);
            const broadcast = await PolluxWeb.trx.sendRawTransaction(
              signTransaction
            );
            console.log("broadcast240", broadcast);
          }

          // store to session storage
          let addresses =
            JSON.parse(sessionStorage.getItem("userAddresses")) || [];
          addresses.push(importWalletData);
          sessionStorage.setItem("userAddresses", JSON.stringify(addresses));
          // setUserAddressFromState(addresses);

          // store to cloudstorage
          const encryptPin = await getCloudStorageData("encrypted");
          if (encryptPin) {
            const pin = decryptString(encryptPin);
            const encryptedWalletAddress = encryptStringWithPin(
              importWalletData,
              pin
            );
            const encryptPrivateKey = encryptStringWithPin(walletData, pin);
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

            // Add the new wallet data object to the existing array
            existingWalletData.push({
              walletAddress: encryptedWalletAddress,
              privateKey: encryptPrivateKey,
              originalWalletAddress: importWalletData,
            });

            // Save the updated array back to cloud storage
            await setCloudStorageData(
              "userData",
              JSON.stringify(existingWalletData)
            );
          }

          // store dataobj after signup in session storage
          let walletDataStore =
            JSON.parse(sessionStorage.getItem("dataObj")) || {};
          if (apiData?.data) {
            walletDataStore[importWalletData] = apiDataOfOTP?.data;
            sessionStorage.setItem("dataObj", JSON.stringify(walletDataStore));

          }

          if (enteredReferralAddress) {
            verifyReferralfunc(
              walletData,
              apiDataOfOTP?.data?.token,
              importWalletData,
              enteredReferralAddress
            );
          } else {
            navigate("/");
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.error(error);
      // toast.error("An error occurred. Please try again.");
    }
  };

  const verifyReferralfunc = async (PK, token, walletAddress, referredBy) => {
    const referralApi = await postVerifyReferral(
      token,
      walletAddress,
      referredBy
    );
    const PolluxWeb = new polluxWeb({
      fullHost: "https://exchangefullnode.poxscan.io/",
      privateKey: PK,
    });


    if (referralApi?.data?.trx1) {
      // Sign tranaction and broadcast transaction for trx2
      const signTransaction2 = await PolluxWeb.trx.sign(
        referralApi?.data?.trx2?.transaction
      );
      console.log("signTransaction", signTransaction2);

      const broadcast2 = await PolluxWeb.trx.sendRawTransaction(
        signTransaction2
      );
      console.log("broadcast", broadcast2);
      navigate("/");
      onClose();
      window.location.reload();
    }
    // else {
    // toast.error("Something went wrong!");
    // }
  };

  return (
    <div
      className={`fixed inset-0 p-2 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-8 rounded-3xl shadow-lg transition-transform duration-300 transform w-full ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegistered === "yes"
            ? "Import Existing Wallet"
            : "Register Your Wallet"}
        </h2>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm text-left mb-2">{error}</p>
        )}

        {/* Input fields based on the user's selection */}
        <input
          type="text"
          value={walletData}
          onChange={(e) => setWalletData(e.target.value)}
          placeholder="Enter Private Key"
          className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {isRegistered === "no" && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email "
              className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <input
              type="text"
              value={enteredReferralAddress}
              onChange={(e) => {
                const fullValue = e.target.value;
                const lastSegment = fullValue.split("/").pop();
                setEnteredReferralAddress(lastSegment);
              }}
              placeholder="Enter referral address"
              className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={isRegistered === "yes" ? handleImport : handleNewRegister}
            className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-xl shadow-lg group hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-xl opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-xl opacity-20 group-hover:rotate-90 ease"></span>
            <span className="absolute inset-0 w-full h-full rounded-xl bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
            <span className="relative text-black text-lg font-bold">
              {isRegistered === "yes" ? "Import" : "Register "}
            </span>
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

const ConnectWallet = ({ setUserAddressFromState }) => {
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

        <RegisteredModal
          isRegisterOpen={registeredModalOpen}
          setRegisteredModalOpen={setRegisteredModalOpen}
        />
      </div>
    </div>
  );
};

export default ConnectWallet;
