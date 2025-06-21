export const isAuthenticated = () => {
    return !! localStorage.getItem("token"); // Check if user token exists
};