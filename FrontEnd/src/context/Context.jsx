import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const Appcontext = createContext();


const AppcontextProvider = (props)=>{
    const currency = '$'

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors , setDoctors] = useState([])
    const [token , setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData ,setUserData] = useState(false)

    const getDoctorsData = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                  setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(err){
            console.log(err)
            toast.error(err.message)
            
        }
    }


    useEffect(()=>{
        getDoctorsData()
    },[])

    const loadUserProfileData = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/user/get-profile' , {headers : {token}})

            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }

        }
        catch(error){
             console.log(err)
            toast.error(err.message)
        }
    }
    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false)
        }
    },[token])


    const value ={
    doctors, getDoctorsData , currency , token , setToken ,backendUrl,userData,setUserData,loadUserProfileData
    }


    return(
    <Appcontext.Provider value = {value}>
        {props.children}
    </Appcontext.Provider>
)

}




export default AppcontextProvider