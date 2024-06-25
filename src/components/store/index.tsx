import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices//navSlice";
import matchesSlice from "./slices/matchesSlice";
import headerNavReducer from "./slices/headerNavSlice";

const store = configureStore({
  reducer: {
    navigationReducer: navigationReducer,
    matchesSlice: matchesSlice,
    headerNavReducer: headerNavReducer,
  },
});

export default store;
