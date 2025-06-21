import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savedJobs: {}, 
};

const savedJobSlice = createSlice({
    name: "savedJobs",
    initialState,
    reducers: {
        saveJob: (state, action) => {
            const { userId, job } = action.payload;

            if (!state.savedJobs[userId]) {
                state.savedJobs[userId] = [];
            }

            if (!state.savedJobs[userId].some(savedJob => savedJob._id === job._id)) {
                state.savedJobs[userId] = [...state.savedJobs[userId], job]; // ✅ Immutable update
            }
        },
        removeSavedJob: (state, action) => {
            const { userId, jobId } = action.payload;

            if (state.savedJobs[userId]) {
                state.savedJobs[userId] = state.savedJobs[userId].filter(job => job._id !== jobId);
            }
        },
        clearSavedJobs: (state) => {
            state.savedJobs = {};  // ✅ Logout होने पर सभी saved jobs reset होंगी
        },
    }
});

export const { saveJob, removeSavedJob,clearSavedJobs } = savedJobSlice.actions;
export default savedJobSlice.reducer;
