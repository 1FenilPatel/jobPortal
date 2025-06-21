import { COMPANY_API_END_POINT } from "@/components/Apis";
import { setAllCompanies } from "@/Redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompany = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllCompany = async()=>{
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                console.log('Called');
                if(res.data.success){
                    dispatch(setAllCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCompany();
    },[])
}

export default useGetAllCompany;