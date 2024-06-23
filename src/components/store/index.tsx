import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices//navSlice";
import matchesSlice from "./slices/matchesSlice";

const store = configureStore({
  reducer: {
    navigationReducer: navigationReducer,
    matchesSlice: matchesSlice,
  },
});

export default store;
