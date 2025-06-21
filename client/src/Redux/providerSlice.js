import {createSlice} from "@reduxjs/toolkit";

const providerSlice = createSlice({
    name:"pro",
    initialState:{
        provider:[],
    },
    reducers:{
        setProvider:(state,action)=>{
            state.provider = action.payload;
        }
    }
});

export const {setProvider} = providerSlice.actions;
export default providerSlice.reducer;