import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        isAdmin: false,  // ✅ Admin flag added
        MyprofilePhoto: null, 
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAdmin = action.payload?.email === "fenil@yahoo.com"; // ✅ Check if Admin
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProfilePhoto: (state, action) => {
            state.MyprofilePhoto = action.payload;  // Store the profile photo in Redux
        },
        clearUser: (state) => {
            state.user = null;
            state.isAdmin = false;  // ✅ Reset Admin Flag on Logout
        }
    }
});

export const { setUser, setLoading, clearUser, setProfilePhoto } = authSlice.actions;
export default authSlice.reducer;
