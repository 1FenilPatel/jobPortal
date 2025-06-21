import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:'job',
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        searchJobByText:"",
        singleJob:null,
        isApplied:false,
        allAppliedJobs:[]
    },
    reducers:{
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs = action.payload;
        },
        setsearchJobByText:(state,action)=>{
            state.searchJobByText = action.payload;
        },
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        },
        setIsApplied:(state,action)=>{
            state.isApplied = action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs = action.payload;
        }
    }
});

export const {setAllAdminJobs,
    setsearchJobByText,
    setAllJobs,
    setSingleJob,
    setAllAppliedJobs,
    setIsApplied
} = jobSlice.actions;
export default jobSlice.reducer;