import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import movieReducer from "./movieSlice"
import accesstokenReducer from "./accesstokenSlice"
const appstore=configureStore({
    reducer:{
        user:userReducer,
        addaccesstoken:accesstokenReducer,
        movies:movieReducer,

       
    }
})

export default appstore

