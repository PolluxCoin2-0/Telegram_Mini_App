import { useState } from "react";
import { encryptString } from "../utils/Encryption";
import { useNavigate } from "react-router-dom";
import { setCloudStorageData } from "../utils/TelegramCloud";

const GeneratePin = () => {
  const [newPin, setNewPin] = useState(""); // State to store the input PIN
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message
  const navigate = useNavigate();

  // Function to handle PIN input
  const handlePinChange = (e) => {
    const pin = e.target.value;

    // Validate to ensure it's only 4 digits and numeric
    if (/^\d{0,4}$/.test(pin)) {
      setNewPin(pin);
      setErrorMessage(""); // Clear any existing error message
    } else {
      setErrorMessage("PIN must be a 4-digit number.");
    }
  };

  // Function to submit and generate the PIN
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the PIN length
    if (newPin.length === 4) {
      const encryptData = encryptString(newPin);
      window.Telegram.WebApp.CloudStorage.removeItems('userData','encrypted',(value,value2)=>{
        console.log(value2)
      })
      sessionStorage.clear();
      setCloudStorageData("encrypted", encryptData);
      setErrorMessage(""); // Clear error message
      navigate("/");
    } else {
      setErrorMessage("Please enter a 4-digit PIN.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100 p-4">
      <div className="p-8 bg-white rounded-3xl shadow-xl transition-shadow duration-300 hover:shadow-2xl w-full max-w-sm">
        <h2 className="text-center mb-6 text-2xl font-extrabold text-gray-900">
          Create Your PIN
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pin"
            >
              Enter a 4-digit PIN
            </label>
            <input
              type="password"
              id="pin"
              value={newPin}
              onChange={handlePinChange}
              maxLength={4}
              className={`w-full px-4 py-2 border ${
                errorMessage ? "border-red-500" : "border-gray-300 "
              } rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 text-lg transition-colors duration-200 placeholder-gray-400`}
              placeholder="***********"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 text-white rounded-xl text-lg font-bold
             shadow-md hover:shadow-lg hover:from-green-300 hover:via-yellow-300 hover:to-pink-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
          >
            Generate PIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneratePin;
