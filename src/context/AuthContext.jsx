import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [charging, setCharging] = useState(true)


    useEffect(()=>{
        const authenticateUser = async()=>{
            const token = localStorage.getItem('MapToken');

            if(!token){
                setCharging(false)
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await axiosClient('/profile', config)
                setAuth(data.user)

            } catch (error) {
                setAuth({})
            }
            setCharging(false)
        }
        authenticateUser()

    },[])

    const logOut = ()=>{
        setAuth({})
        localStorage.removeItem('MapToken')
    }

    return(
        <AuthContext.Provider value={{auth, setAuth, charging, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}



export { 
    AuthProvider
}

export default AuthContext
