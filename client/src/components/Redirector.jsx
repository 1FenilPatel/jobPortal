import { isAuthenticated } from "@/Utils/Authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirector = () =>{
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated()){
            navigate("/");
        }else {
            navigate("/login");
        }
    },[navigate]);

    return null;
}
export default Redirector;