import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatches: [],
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setAllMatches: (state, action) => {
      state.allMatches = action.payload;
    },
  },
});

export const { setAllMatches } = matchSlice.actions;
export default matchSlice.reducer;
