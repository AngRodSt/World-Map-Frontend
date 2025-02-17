import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const WorldMapContext = createContext();

const WorldMapProvider = ({ children }) => {
    const { auth } = useAuth();
    const [countrys, setCountrys] = useState([])
    const [country, setCountry] = useState([])

    const [notes, setNotes] = useState([])
    const[note, setNote] = useState([])


    
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
                // console.log(error.response.data.msg)
            }
        }
        getCountrys();

        const getNotes = async() => {
            const token = localStorage.getItem('MapToken');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


            try {
                const { data } = await axiosClient('/notes', config)
                setNotes(data);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

        getNotes()
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

    const saveNote = async (note) => {
        const token = localStorage.getItem('MapToken');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (note.id) {
            
            try {
                const { data } = await axiosClient.put(`/notes/${note.id}`, note, config)
                const updatedNotes = notes.map(note => note._id === data._id ? data : note)
                setNotes(updatedNotes)
            } catch (error) {
                console.log(error.response)
            }

        }
        else {
            try {
                const { data } = await axiosClient.post(`/notes`, note, config)
                setNotes([data, ...notes])
            } catch (error) {
                console.log(error.response)
            }

        }
    }

    const editNote = (note)=>{
        setNote(note)
    }

    const deleteNote = async(id)=>{
        const token = localStorage.getItem('MapToken');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axiosClient.delete(`/notes/${id}`, config)
            const updateNotes = notes.filter(note => note._id !== id )
            setNotes(updateNotes)
        } catch (error) {
            console.log(error.response)
        }
    }

    
    return (
        <WorldMapContext.Provider value={{ countrys, setCountry, saveCountry, deleteCountry, editNote, note, setNote, notes, saveNote, deleteNote }}>
            {children}
        </WorldMapContext.Provider>
    )
}

export {WorldMapProvider}

export default WorldMapContext
