import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";


const NotesContext = createContext();

const NotesProvider = ({children}) => {
    const { auth } = useAuth();
    const [notes, setNotes] = useState([])
    const [notesFiltered, setNotesFiltered] = useState([])
    const[note, setNote] = useState([])


    useEffect(() => {
        
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

    const filterNotes = async(params) => {
        const token = localStorage.getItem('MapToken');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post('/notes/filter', params, config)
            setNotesFiltered(data)
        } catch (error) {
            
        }
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
        <NotesContext.Provider value={{ setNotes, editNote, note, setNote, notes, saveNote, deleteNote, filterNotes, notesFiltered }}>
            {children}
        </NotesContext.Provider>
    )
}

export 
{
    NotesProvider
}

export default NotesContext