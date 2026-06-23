import { configureStore } from "@reduxjs/toolkit";
import aqiReducer from './aqiSlice';

export const store = configureStore({
  reducer: {
    aqi: aqiReducer,
  },
});

