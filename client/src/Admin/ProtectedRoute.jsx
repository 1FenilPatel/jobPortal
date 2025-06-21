import { store } from "@/Redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.role === "provider") {  
            // ✅ Admin email check (Change this if needed)
            navigate("/");
        }
    }, [user, navigate]); 
    return (
        <>
        {children}
        </>
    )
};

export default ProtectedRoute;