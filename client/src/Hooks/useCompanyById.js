import { COMPANY_API_END_POINT } from "@/components/Apis";
import { setSingleCompany } from "@/Redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useCompanyById = (companyId)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async()=>{
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                console.log(res.data.company);
    
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                    console.log(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch]);
}

export default useCompanyById;