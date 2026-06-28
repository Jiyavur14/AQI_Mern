import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
    name:"cityAqi",

    initialState:{
        citie:JSON.parse(localStorage.getItem('citie')) || {}
    },

    reducers:{
        setAQICity(state,action){
            const {cityinput,fulll} = action.payload
            state.citie[cityinput] = fulll;
            localStorage.setItem('citie', JSON.stringify(state.citie));
        },

        removeCity(state,action){
            delete state.citie[action.payload];
            localStorage.setItem('citie', JSON.stringify(state.citie));
        }
    }
});

export const {setAQICity,removeCity} = citySlice.actions;

export default citySlice.reducer;