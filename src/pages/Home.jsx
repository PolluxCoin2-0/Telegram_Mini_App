/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import polluxWeb from "polluxweb";
import {
  getDataOfMiningFromDatabase,
  getTransactionResult,
  getUserBalance,
  getVotePower,
  postDistributeReferralRewards,
  postMintUser,
  saveDataOfMiningInDatabase,
  saveUserMinigData,
  updateBalance,
} from "../utils/api";
import { useEffect, useState } from "react";
import { getCloudStorageData } from "../utils/TelegramCloud";
import CountdownTimerWithSlots from "./CountdownTimerWithSlots";
import { decryptString, decryptStringWithPin } from "../utils/Encryption";

const Home = ({activeWalletAddressPresent}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlotNumber, setCurrentSlotNumber] = useState(null);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(()=>{
    const fetchData =async()=>{
      console.log({activeWalletAddressPresent})
      const balanceData = await getUserBalance(activeWalletAddressPresent);
      console.log("balanceData", balanceData?.data?.Your_Balance);
      setUserBalance(balanceData?.data?.Your_Balance)
    }
    fetchData();
  },[activeWalletAddressPresent])

  const handleTapMining = async () => {
    let walletDataStore = JSON.parse(sessionStorage.getItem("dataObj")) || {};

    console.log({walletDataStore})

    // Function to get wallet data by address
    const getWalletDataByAddress = (address) => {
    return walletDataStore[address]; // Return the object or null if the address doesn't exist
    };

    const walletInfo = getWalletDataByAddress(activeWalletAddressPresent);
    console.log({walletInfo})

    const currentDate = new Date().toISOString().split("T")[0];
    
    if (!activeWalletAddressPresent) {
      toast.error("Connect your wallet.");
      return;
    }

    const votePower = await getVotePower(activeWalletAddressPresent);
    const totalAmount = (votePower.data.frozenV2 && Array.isArray(votePower.data.frozenV2)) ? 
    votePower.data.frozenV2.reduce((sum, item) => sum + (item.amount || 0), 0) / 10 ** 6 
    : 0;
      // votePower.data.frozenV2.reduce(
      //   (sum, item) => sum + (item.amount || 0),
      //   0
      // ) /
      // 10 ** 6;
    if (totalAmount < 25) {
      toast.error("Insufficient stake amount !");
      return;
    }

    const userData = await getDataOfMiningFromDatabase(activeWalletAddressPresent);

    if (
      userData?.data?.userSlotNumber === currentSlotNumber &&
      userData?.data?.userSlotDate.split("T")[0] === currentDate &&
      activeWalletAddressPresent === userData?.data?.walletAddress
    ) {
      toast.error("You have already minted in this slot.");
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const apiData = await postMintUser(activeWalletAddressPresent, walletInfo?.token);
      console.log("apidata",apiData);
      const storedUserAddressPresent = await getCloudStorageData("userData");

      // Function to find the matching wallet address object
      const findWalletObjectByAddress = (wallets, address) => {
        return wallets.find(wallet => {
          // Return the result of the comparison
          return wallet?.originalWalletAddress === address;
        });
      };

      // Get the matched object
      const matchedWalletObject = findWalletObjectByAddress(JSON.parse(storedUserAddressPresent), activeWalletAddressPresent);
      const privateKeyUser = matchedWalletObject?.privateKey;

      const encryptPin = await getCloudStorageData("encrypted");
      const pin = decryptString(encryptPin);
      
      const decryptedPrivateKey = decryptStringWithPin(privateKeyUser, pin);

      const PolluxWeb = new polluxWeb({
        fullHost: "https://exchangefullnode.poxscan.io/",
        privateKey: decryptedPrivateKey,
      });

      const address =await PolluxWeb.contract().at(
        "PApFeUXaX7jjHu3RQcwvgzy1tCwt3G9Q42"
      );
      let txn ;
      try {
        txn= await address.mint().send();

      } catch (error) {
        console.log(error,"errrrorororoorororo");
        toast.error("something went wrong")
      }
      console.log(txn);

      // check transaction result >> SUCCESS : REVERT
      const transactionResult = await getTransactionResult(
        txn
      );
      console.log("result", transactionResult);

      if( transactionResult?.data?.receipt?.result === "REVERT"){
        toast.error("Your Transaction was REVERTED");
        return;
      }
    
      // Distribute referral rewards
      if (walletInfo?.referredBy) {
        const referralData = await postDistributeReferralRewards(activeWalletAddressPresent);
        console.log("referralData", referralData);
        
        const signTransaction2 = await PolluxWeb.trx.sign(
          referralData?.data?.transaction
        );
        console.log("signTransaction", signTransaction2);
        const broadcast2 = await PolluxWeb.trx.sendRawTransaction(
          signTransaction2
        );
        console.log("broadcast", broadcast2);
      }

      if (transactionResult?.data?.receipt?.result === "SUCCESS") {
        const savedData = await saveUserMinigData(
          walletInfo?.token,
          apiData?.data?.transaction?.txID,
          activeWalletAddressPresent,
          transactionResult?.data?.receipt?.result
        );
        console.log("savedData", savedData);

        // update token balance
      const updateTokenBalance = await updateBalance(walletInfo?.token);
      console.log("updateTokenBalance", updateTokenBalance);

      
      // save the mining data in database
      const usersavedData = await saveDataOfMiningInDatabase(
        walletInfo  ?.token,
        currentSlotNumber,
        activeWalletAddressPresent
      );
      
      console.log("saveDataOfMiningInDatabase", usersavedData);
      toast.success("Your mining has started.");
      }

    } catch (error) {
      toast.error("Mining was canceled or failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100">
      <div className="space-y-6 w-full px-4 flex flex-col items-center">
        <CountdownTimerWithSlots setCurrentSlotNumber={setCurrentSlotNumber} />

        <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200
         hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold
          rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2">Balance: {userBalance ? userBalance :0}</button>
        {/* Mint Button */}
        <button
          onClick={handleTapMining}
          className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-3 overflow-hidden font-medium text-white transition
           duration-300 ease-out rounded-full shadow-lg group hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
          <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
          <span className="relative text-black text-lg font-bold">Mint</span>
        </button>

        {/* Buy Uvi Button */}
        <a
          href="/buycoin"
          className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
          <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
          <span className="relative text-black text-lg font-bold">Buy Uvi</span>
        </a>
      </div>
    </div>
  );
};

export default Home;
