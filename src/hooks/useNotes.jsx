import { useContext } from "react";
import NotesContext from "../context/NotesContext";

const useNotes = () => {
    return useContext(NotesContext)
}

export default useNotes