import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import constants from "../lib/constants";

const authState = createSlice({
  name: "Global",
  initialState: constants.EMPTY_GLOBAL_STATE,
  reducers: {
    setProfileId: (state, action: PayloadAction<string>) => {
      state.profile_id = action.payload;
    },
  },
});

export const { setProfileId } = authState.actions;

export default authState.reducer;
