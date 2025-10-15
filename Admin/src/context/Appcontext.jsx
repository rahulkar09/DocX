import { createContext } from "react";

export const Appcontext = createContext()

const AppcontextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
       const value = {
        backendUrl

       }

       return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
       )
}

export default AppcontextProvider