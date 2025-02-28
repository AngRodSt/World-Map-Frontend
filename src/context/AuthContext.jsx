import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [charging, setCharging] = useState(true)



    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('MapToken');

            if (!token) {
                setCharging(false)
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/profile', config)
                setAuth(data.updatedUser)

            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCharging(false)
        }
        authenticateUser()

    }, [])

    const updateProfile = async (profile) => {
        const token = localStorage.getItem('MapToken');

        if (!token) {
            setCharging(false)
            return;
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            await axiosClient.post(`/profile/${profile.id}`, profile, config)
            // setAuth(data.user)

        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
    const logOut = () => {
        localStorage.removeItem('MapToken')
        setAuth({})

    }

    const sendEmailResetPassword = async (email) => {
        try {
            const { data } = await axiosClient.post('/resetPassword', email)
            return data
        } catch (error) {
            return error.response.data.msg
        }
    }

    const changePassword = async (info) => {
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
            await axiosClient.post('/changePassword', info, config)
        } catch (error) {
            throw Error('')
        
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, charging, logOut, updateProfile, sendEmailResetPassword, changePassword }}>
            {children}
        </AuthContext.Provider>
    )
}



export {
    AuthProvider
}

export default AuthContext
