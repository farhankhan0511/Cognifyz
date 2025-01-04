import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:"movies",
    initialState:{
        nowplayingmovies:null,
        trailerMovie:null,
        popularmovies:null,
        upcomingmovies:null,
        topratedmovies:null,
    
    },
    reducers:{
        addnowplayingmovies:(state,action)=>{
            state.nowplayingmovies=action.payload;
        },
        addPopularmovies:(state,action)=>{
            state.popularmovies=action.payload;
        },
        addupcomingmovies:(state,action)=>{
            state.upcomingmovies=action.payload;
        },
        addTopratedmovies:(state,action)=>{
            state.topratedmovies=action.payload;
        },
        addTrailerMovie:(state,action)=>{
            state.trailerMovie=action.payload
        }
    },


})
export const {addnowplayingmovies,addTrailerMovie,addPopularmovies,addTopratedmovies,addupcomingmovies}=movieSlice.actions;
export default movieSlice.reducer