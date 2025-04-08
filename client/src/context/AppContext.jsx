import React,{createContext,useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const AppContext=createContext();
const AppContectProvider=(props)=>{
    const [user,setUser]=useState(null);
    const [showLogin,setShowLogin]=useState(false);
    const [token,setToken]=useState(localStorage.getItem('token'));
    const [credit,setCredit]=useState(false);

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const navigate=useNavigate();
    const loadCreditsData=async()=>{
        try{
            const {data}=await axios.get(backendUrl+ '/api/user/credits', {headers:{token}})
            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    const generateImage=async(prompt)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/image/generate-image',{prompt},{headers:{token}})
            if(data.success){
                loadCreditsData();
                return data.resultImage
            }
            else{
                toast.error(data.message)
                loadCreditsData();
                if(data.creditBalance===0){
                    navigate('/buy')
                }
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(token){
            loadCreditsData();
        }
    },[token])
    //useEffect will run when token changes and it will call loadCreditsData function
    const logout=()=>{
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }

    const value={
        user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData,logout,generateImage
     }
    return(
        //what is happening here ? 
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContectProvider