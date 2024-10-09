/* eslint-disable react/prop-types */
import { useState } from "react";
import PinInput from "react-pin-input";
import { Link } from "react-router-dom"; // Import Link
import { decryptString } from "../utils/Encryption";
import { getCloudStorageData } from "../utils/TelegramCloud";
import { postLogin } from "../utils/api";

const PinLock = ({ setPinEntered, setUserAddressPresent }) => {
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const handlePinComplete = async (value) => {
    setUserAddressPresent(false);
    const encryptPin = await getCloudStorageData("encrypted");
    if (!encryptPin) {
      setErrorMessage("First, Generate Your Pin!");
      return;
    }
    const pin = decryptString(encryptPin);

    if (pin === value) {
      setPinEntered(true);
      sessionStorage.setItem("pinEntered", value ? "true" : "false");
      setErrorMessage("");
      const storedUserAddressPresentwithoutParsing = await getCloudStorageData(
        "userData"
      );
      const storedUserAddressPresent = JSON.parse(
        storedUserAddressPresentwithoutParsing
      );

      if (storedUserAddressPresent) {
        // Initialize an object to store wallet addresses and corresponding data
        let walletDataStore = JSON.parse(sessionStorage.getItem("dataObj")) || {};

        for (let i = 0; i < storedUserAddressPresent.length; i++) {
          if (storedUserAddressPresent[i]?.originalWalletAddress) {
            // Fetch data for each wallet address
            const dataObj = await postLogin(storedUserAddressPresent[i]?.originalWalletAddress);
            // // // Check if dataObj exists and store it as key-value pair in the object
            if (dataObj?.data) {
              walletDataStore[
                storedUserAddressPresent[i]?.originalWalletAddress
              ] = dataObj.data;
            }
          }
        }

        // Store the object in sessionStorage
        sessionStorage.setItem("dataObj", JSON.stringify(walletDataStore));
      }
      console.log(
        "dataobjjjjjjjjjjjjjj",
        JSON.parse(sessionStorage.getItem("dataObj"))
      );
      setUserAddressPresent(true);
    } else {
      setErrorMessage("Entered Pin is wrong.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100 p-4">
      <div className="p-8 bg-white rounded-3xl shadow-lg transition-shadow duration-300 hover:shadow-xl w-full max-w-xs">
        <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">
          Enter Your PIN
        </h2>
        <PinInput
          length={4} // 4-digit PIN
          initialValue=""
          secret
          secretDelay={100}
          onChange={(value, index) => {}}
          type="numeric"
          inputMode="number"
          style={{ display: "flex", justifyContent: "center", gap: "8px" }} // Center the inputs
          inputStyle={{
            borderColor: "gray",
            borderRadius: "12px", // Slightly smaller border radius for a compact look
            fontSize: "1.5rem", // Reduced font size for inputs
            width: "50px", // Adjusted width for each digit input
            height: "50px", // Adjusted height for each digit input
            textAlign: "center",
            transition: "border-color 0.3s ease-in-out",
            backgroundColor: "#f3f4f6", // Lighter background for inputs
          }}
          inputFocusStyle={{
            borderColor: "black",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
          }}
          onComplete={handlePinComplete}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        {/* Conditionally render the error message if there is one */}
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
        <p className="text-center mt-4 text-gray-600 text-sm md:text-base">
          Don't have a PIN?{" "}
          {/* Use Link instead of <a> for internal navigation */}
          <Link to="/generatepin" className="text-blue-500 underline">
            Generate one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PinLock;
