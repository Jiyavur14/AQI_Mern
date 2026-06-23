import { createSlice } from "@reduxjs/toolkit";

const aqiSlice = createSlice({

    name:"aqi",

    initialState:{
        polluData:{}
    },

    reducers:{
        setAQIData(state,action){
            state.polluData = action.payload;
        },
    },

})

export const {setAQIData} = aqiSlice.actions;

export default aqiSlice.reducer;