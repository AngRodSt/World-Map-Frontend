import Header from "../components/Header"
import Footer from "../components/Footer" 
import useWorldMap from "../hooks/useWorldMap"
import Note from "../components/NoteBody"
import { useEffect, useState } from "react"
import NoteModal from "../components/NoteModal"



const Notes = () => {   
  const {notes} = useWorldMap()

  return (
    <>
    <Header/>
    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2  grid-cols-1 m-10 gap-5 ">
      {notes.map((note, index) => (
        <Note key={index} note={note}  />
      ))}
    
    </div>
    <Footer/>
    </>
  )

  
}
export default Notes