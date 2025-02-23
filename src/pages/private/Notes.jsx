
import useWorldMap from "../../hooks/useWorldMap"
import Note from "../../components/NoteBody"




const Notes = () => {
  const { notes } = useWorldMap()

  return (
    <>
        <div className="grid xl:grid-cols-5 font-bold lg:grid-cols-3 md:grid-cols-2  grid-cols-1 m-10 gap-5 ">
          {notes.map((note, index) => (
            <Note key={index} note={note} />
          ))}
        </div>
    </>
  )


}
export default Notes