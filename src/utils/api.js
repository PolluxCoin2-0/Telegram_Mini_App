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

// export const postLogin = async (walletAddress) => {
//     try {
//       const res = await axios.post(BASE_URL + "/login", {
//         walletAddress: walletAddress,
//       });
//       return res?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

// GET VOTE POWER
export const getVotePower = (walletAddress) =>
  postRequest("/getStakeBalance", { address: walletAddress, visible: true });

// export const getVotePower = async (walletAddress) => {
//   try {
//     const res = await axios.post(BASE_URL + "/getStakeBalance", {
//       address: walletAddress,
//       visible: true,
//     });
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// get data of mining from db
export const getDataOfMiningFromDatabase = (walletAddress) =>
  postRequest("/getSlotByWalletAddress", { walletAddress });

// export const getDataOfMiningFromDatabase = async (walletAddress) => {
//   try {
//     const res = await axios.post(BASE_URL + "/getSlotByWalletAddress", {
//       walletAddress: walletAddress,
//     });
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// MINT USER
export const postMintUser = (walletAddress, token) =>
  postRequest(
    "/mint",
    { walletAddress },
    { Authorization: `Bearer ${token}` }
  );

// export const postMintUser = async (walletAddress, token) => {
//   try {
//     const res = await axios.post(
//       BASE_URL + "/mint",
//       {
//         walletAddress: walletAddress,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };


// Get Transaction Result
export const getTransactionResult = (transactionId) =>
  postRequest("/chaintransactionById", { value: transactionId });

// export const getTransactionResult = async (transactionId) => {
//   console.log({transactionId})
//   try {
//     const res = await axios.post(BASE_URL + `/chaintransactionById`, {
//       value: transactionId,
//     });
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

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

// export const saveUserMinigData = async (
//   token,
//   trxId,
//   walletAddress,
//   status
// ) => {
//   try {
//     const res = await axios.post(
//       BASE_URL + "/createMint",
//       {
//         trxId: trxId,
//         walletAddress: walletAddress,
//         to: "PAxZmTCTKAbSvc4Y2H4WdZrtWWwsHsbUzg",
//         amount: 25,
//         status: status,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Distribute referral rewards
export const postDistributeReferralRewards = (walletAddress) =>
  postRequest("/distributeReferralRewards", { walletAddress });

// export const postDistributeReferralRewards = async (walletAddress) => {
//   try {
//     const res = await axios.post(BASE_URL + "/distributeReferralRewards", {
//       walletAddress: walletAddress,
//     });
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Update token Balance

export const updateBalance = (token) =>
  putRequest("/updateTokenBalance", {}, { Authorization: `Bearer ${token}` });

// export const updateBalance = async (token) => {
//   try {
//     const res = await axios.put(
//       BASE_URL + "/updateTokenBalance",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// save data of mining into db
export const saveDataOfMiningInDatabase = (token, userSlotNumber, walletAddress) =>
  putRequest(
    `/createSlot/${walletAddress}`,
    { userSlotNumber },
    { Authorization: `Bearer ${token}` }
  );

// export const saveDataOfMiningInDatabase = async (
//   token,
//   userSlotNumber,
//   walletAddress
// ) => {
//   try {
//     const res = await axios.put(
//       BASE_URL + `/createSlot/${walletAddress}`,
//       {
//         userSlotNumber: userSlotNumber,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// SIGNUP
export const postSignup = (walletAddress, email, referredBy) =>
  postRequest("/signUp", { walletAddress, email, referredBy });

// export const postSignup = async (walletAddress, email, referredBy) => {
//   try {
//     const res = await axios.post(BASE_URL + "/signUp", {
//       walletAddress: walletAddress,
//       email: email,
//       referredBy: referredBy,
//     });
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// OTP
export const postOTPVerify = (email, otp) =>
  postRequest("/VerifyOtp", { email, otp });

// export const postOTPVerify = async (email, otp) => {
//   try {
//     const res = await axios.post(BASE_URL + "/VerifyOtp", {
//       email: email,
//       otp: otp,
//     });
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Set Referrer
export const postSetReferrer = (walletAddress, referrer) =>
  postRequest("/setReferrer", { referrer, walletAddress });

// export const postSetReferrer = async (walletAddress, referrer) => {
//   try {
//     const res = await axios.post(
//       BASE_URL + "/setReferrer",
//       {
//          "referrer": referrer,
//          "walletAddress": walletAddress
//       },
//     );
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// referral verification
export const postVerifyReferral = (token, walletAddress, referralCode) =>
  postRequest(
    "/verifyReferralCode",
    { walletAddress, referralCode },
    { Authorization: `Bearer ${token}` }
  );

// export const postVerifyReferral = async (token, walletAddress, referralCode) => {
//   try {
//     const res = await axios.post(
//       BASE_URL + "/verifyReferralCode",
//       {
//         walletAddress: walletAddress,
//         referralCode: referralCode,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
