import Header from "../components/Header"
import Footer from "../components/Footer"
import useWorldMap from "../hooks/useWorldMap"
import Note from "../components/NoteBody"
import { useEffect, useState } from "react"
import NoteModal from "../components/NoteModal"



const Notes = () => {
  const { notes } = useWorldMap()

  return (
    <>
      <main className=" absolute poiret-one-regular inset-0 h-full bg-[url(/backgroud1.jpg)] bg-cover bg-no-repeat bg-fixed filter ">
        <Header />
        <div className="grid xl:grid-cols-5 font-bold lg:grid-cols-3 md:grid-cols-2  grid-cols-1 m-10 gap-5 ">
          {notes.map((note, index) => (
            <Note key={index} note={note} />
          ))}

        </div>
        <Footer />
      </main>
    </>
  )


}
export default Notes