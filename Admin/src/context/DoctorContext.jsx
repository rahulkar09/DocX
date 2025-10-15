import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dtoken , setDToken] = useState( localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")
    const [appointments , setAppointments] = useState([])

    const [profileData,setProfileData] = useState(false)

    const getAppointments = async()=>{
        try{
            const {data} = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dtoken } });
            
            if(data.success){
                const reversed = [...data.appointments].reverse()
                setAppointments(reversed)
                console.log(reversed)
                
            }
            else{
                toast.error(data.message)
            }

        }
        catch(error){
            console.log(error)

            toast.error(error.message)
        }

    }

    const getProfileData = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/profile' , {headers : {dtoken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData)
            }

        }
        catch(error){

        }
    }



       const value = {
        dtoken, setDToken , backendUrl,getAppointments,setAppointments,appointments,profileData,setProfileData,getProfileData

       }

       return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
       )
}

export default DoctorContextProvider