import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
    name:"cityAqi",

    initialState:{
        citie:{}
    },

    reducers:{
        setAQICity(state,action){
            const {cityinput,fulll} = action.payload
            state.citie[cityinput] = fulll;
        },

        removeCity(state,action){
            delete state.citie[action.payload];
        }
    }
});

export const {setAQICity,removeCity} = citySlice.actions;

export default citySlice.reducer;