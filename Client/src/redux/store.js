import { configureStore } from "@reduxjs/toolkit";
import aqiReducer from './aqiSlice';
import cityReducer from './citySlice';

export const store = configureStore({
  reducer: {
    aqi: aqiReducer,
    cityAqi: cityReducer
  },
});

