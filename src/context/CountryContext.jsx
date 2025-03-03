import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const { auth } = useAuth();
    const [countrys, setCountrys] = useState([])
    const [country, setCountry] = useState([])
  
    useEffect(() => {
        const getCountrys = async () => {
            const token = localStorage.getItem('MapToken');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
            try {
                const { data } = await axiosClient('/country', config)
                setCountrys(data);

            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        getCountrys();

    }, [auth])


    const saveCountry = async (country) => {
        const token = localStorage.getItem('MapToken');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (country.id) {
            
            try {
                const { data } = await axiosClient.put(`/country/${country.id}`, country, config)
                const updatedCountrys = countrys.map(country => country._id === data._id ? data : country)
                setCountrys(updatedCountrys)
            } catch (error) {
                console.log(error.response)
            }

        }
        else {
            try {
                const { data } = await axiosClient.post(`/country`, country, config)
                setCountrys([data, ...countrys])
            } catch (error) {
                console.log(error.response)
            }

        }
    }

    const deleteCountry = async(id)=>{
        const token = localStorage.getItem('MapToken');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axiosClient.delete(`/country/${id}`, config)
            const updatedCountrys = countrys.filter(country => country._id !== id )
            setCountrys(updatedCountrys)
        } catch (error) {
            console.log(error.response)
        }

    }

    
    return (
        <CountryContext.Provider value={{ countrys, setCountry, saveCountry, deleteCountry }}>
            {children}
        </CountryContext.Provider>
    )
}

export {CountryProvider}

export default CountryContext
