import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Login
export const postLogin = async (walletAddress) => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        walletAddress: walletAddress,
      });
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

// GET VOTE POWER
export const getVotePower = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/getStakeBalance", {
      address: walletAddress,
      visible: true,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// get data of mining from db
export const getDataOfMiningFromDatabase = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/getSlotByWalletAddress", {
      walletAddress: walletAddress,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// MINT USER
export const postMintUser = async (walletAddress, token) => {
  try {
    const res = await axios.post(
      BASE_URL + "/mint",
      {
        walletAddress: walletAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionResult = async (transactionId) => {
  try {
    const res = await axios.post(BASE_URL + `/chaintransactionById`, {
      value: transactionId,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Save create mining data to database
export const saveUserMinigData = async (
  token,
  trxId,
  walletAddress,
  status
) => {
  try {
    const res = await axios.post(
      BASE_URL + "/createMint",
      {
        trxId: trxId,
        walletAddress: walletAddress,
        to: "PAxZmTCTKAbSvc4Y2H4WdZrtWWwsHsbUzg",
        amount: 25,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Distribute referral rewards
export const postDistributeReferralRewards = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/distributeReferralRewards", {
      walletAddress: walletAddress,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Update token Balance
export const updateBalance = async (token) => {
  try {
    const res = await axios.put(
      BASE_URL + "/updateTokenBalance",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// save data of mining into db
export const saveDataOfMiningInDatabase = async (
  token,
  userSlotNumber,
  walletAddress
) => {
  try {
    const res = await axios.put(
      BASE_URL + `/createSlot/${walletAddress}`,
      {
        userSlotNumber: userSlotNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// SIGNUP
export const postSignup = async (walletAddress, email, referredBy) => {
  try {
    const res = await axios.post(BASE_URL + "/signUp", {
      walletAddress: walletAddress,
      email: email,
      referredBy: referredBy,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// OTP
export const postOTPVerify = async (email, otp) => {
  try {
    const res = await axios.post(BASE_URL + "/VerifyOtp", {
      email: email,
      otp: otp,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Set Referrer
export const postSetReferrer = async (walletAddress, referrer) => {
  try {
    const res = await axios.post(
      BASE_URL + "/setReferrer",
      {
         "referrer": referrer,
         "walletAddress": walletAddress
      },
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// referral verification
export const postVerifyReferral = async (token, walletAddress, referralCode) => {
  try {
    const res = await axios.post(
      BASE_URL + "/verifyReferralCode",
      {
        walletAddress: walletAddress,
        referralCode: referralCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
