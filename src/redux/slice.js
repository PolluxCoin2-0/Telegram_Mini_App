import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    userAddress:"",
    dataObject:{},
  },
  reducers: {
    setUserAddress: (state, action) => {
        state.userAddress = action.payload;
      },
    setDataObject: (state, action) => {
      state.dataObject = action.payload;
    },
  },
});

export const {setUserAddress, setDataObject} = walletSlice.actions;
export default walletSlice.reducer;
