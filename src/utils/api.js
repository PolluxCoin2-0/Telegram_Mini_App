import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Helper function for POST requests
const postRequest = async (endpoint, data = {}, headers = {}) => {
  try {
    const res = await axios.post(BASE_URL + endpoint, data, { headers });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Helper function for PUT requests
const putRequest = async (endpoint, data = {}, headers = {}) => {
  try {
    const res = await axios.put(BASE_URL + endpoint, data, { headers });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// API Methods>>>>>>>>

// Login
export const postLogin = (walletAddress) =>
  postRequest("/login", { walletAddress });

// GET VOTE POWER
export const getVotePower = (walletAddress) =>
  postRequest("/getStakeBalance", { address: walletAddress, visible: true });

// get data of mining from db
export const getDataOfMiningFromDatabase = (walletAddress) =>
  postRequest("/getSlotByWalletAddress", { walletAddress });  

// MINT USER
export const postMintUser = (walletAddress, token) =>
  postRequest(
    "/mint",
    { walletAddress },
    { Authorization: `Bearer ${token}` }
  );

// Get Transaction Result
export const getTransactionResult = (transactionId) =>
  postRequest("/chaintransactionById", { value: transactionId });

// Save create mining data to database
export const saveUserMinigData = (token, trxId, walletAddress, status) =>
  postRequest(
    "/createMint",
    {
      trxId,
      walletAddress,
      to: "PAxZmTCTKAbSvc4Y2H4WdZrtWWwsHsbUzg",
      amount: 25,
      status,
    },
    { Authorization: `Bearer ${token}` }
  );

// Distribute referral rewards
export const postDistributeReferralRewards = (walletAddress) =>
  postRequest("/distributeReferralRewards", { walletAddress });

// Update token Balance
export const updateBalance = (token) =>
  putRequest("/updateTokenBalance", {}, { Authorization: `Bearer ${token}` });

// save data of mining into db
export const saveDataOfMiningInDatabase = (token, userSlotNumber, walletAddress) =>
  putRequest(
    `/createSlot/${walletAddress}`,
    { userSlotNumber },
    { Authorization: `Bearer ${token}` }
  );

// SIGNUP
export const postSignup = (walletAddress, email, referredBy) =>
  postRequest("/signUp", { walletAddress, email, referredBy });

// OTP
export const postOTPVerify = (email, otp) =>
  postRequest("/VerifyOtp", { email, otp });

// Set Referrer
export const postSetReferrer = (walletAddress, referrer) =>
  postRequest("/setReferrer", { referrer, walletAddress });

// referral verification
export const postVerifyReferral = (token, walletAddress, referralCode) =>
  postRequest(
    "/verifyReferralCode",
    { walletAddress, referralCode },
    { Authorization: `Bearer ${token}` }
  );

  export const getUserBalance = async(walletAddress)=>{
    const userBalance = await axios.get(`https://node.poxscan.io/isValidAddress?userAddress=${walletAddress}&contractAddress=PApFeUXaX7jjHu3RQcwvgzy1tCwt3G9Q42&type=mainnet`);
    return userBalance?.data;
  }
