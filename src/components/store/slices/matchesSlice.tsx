import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatches: [],
  allTournaments: [],
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setAllMatches: (state, action) => {
      state.allMatches = action.payload;
    },
    setAllTournament: (state, action) => {
      state.allTournaments = action.payload;
    },
  },
});

export const { setAllMatches, setAllTournament } = matchSlice.actions;
export default matchSlice.reducer;
