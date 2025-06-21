import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:'company',
    initialState:{
        singleCompany:null,
        allCompanies:[],
        searchCompayByText:""
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload;
        },
        setAllCompanies:(state,action)=>{
            state.allCompanies = action.payload;
        },
        setsearchCompayByText:(state,action)=>{
            state.searchCompayByText = action.payload;
        }
    }
});

export const {setAllCompanies,setSingleCompany,setsearchCompayByText} = companySlice.actions;
export default companySlice.reducer;