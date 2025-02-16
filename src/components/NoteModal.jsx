import { useState, useEffect } from "react"
import Alert from "./Alert";
import useWorldMap from "../hooks/useWorldMap";




const NoteModal = ({countryName, countryCode, setIsOpen}) => {
    const [alert, setAlert] = useState([])
    const [isHovered, setIsHovered] = useState(false);
    const { saveNote, note, setNote } = useWorldMap()
    const { country, message, name, code, _id } = note
    const MAX_WORDS = 50;
    const [noteLocal, setNoteLocal] = useState({
        message: message || '' ,
        country: country || '',
        name: name || '',
        code: code || '',
        id: _id || null

    })
    

    useEffect(()=>{
        setNoteLocal({...noteLocal, country: countryName, code: countryCode})
      },[countryName])


    console.log(note)

    const handleChangeTextArea = (e) => {
        const inputText = e.target.value;
        const words = inputText.trim().split(/\s+/).filter(Boolean);
        if (words.length <= MAX_WORDS) {
            setNoteLocal({ ...noteLocal, message: inputText });
        } else {
            const limitedText = words.slice(0, MAX_WORDS).join(' ');
            setNoteLocal({ ...noteLocal, message: limitedText });
        }

    }

    const wordCount = noteLocal.message.trim().split(/\s+/).filter(Boolean).length;

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!noteLocal.message){
          setAlert({
            msg: 'The field cannot be empty',
            error: true
          })
          return
        }
        setAlert({})
        try {
          await saveNote(noteLocal)
          setAlert({
            msg: 'Note saved successfully',
          })
    
        } catch (error) {
          console.log(error.response)
        }
        
        setTimeout(() => {
          setAlert({})
          setNoteLocal({...noteLocal, message:'', name: ''})
          if(setIsOpen){
            setIsOpen(false)
          }
        }, 1000);

        
        setNote({})
    
      }
    
      const {msg} = alert

    return (
        <>
            <div className="mt-5  ">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label htmlFor="name" className="font-bold text-xl text-gray-700">Name</label>
                    <input value={noteLocal.name} onChange={(e) => setNoteLocal({ ...noteLocal, name: e.target.value })} id="name" type="text" placeholder="Name of the person you met (not mandatory)" className="p-2 rounded-lg my-2 bg-gray-100 border" />
                    <label htmlFor="messege" className="font-bold text-xl text-gray-700">Notes</label>
                    <textarea value={noteLocal.message} onChange={handleChangeTextArea} rows={4} name="messege" id="messege" placeholder="Add Note" className="p-2 rounded-lg my-2 bg-gray-100 border " style={{
                        resize: 'none'
                    }}></textarea>
                    <p className="text-gray-400 mb-4 text-sm">Words: {wordCount}/{MAX_WORDS}</p>
                    <button type="submit" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className=" text-white hover:bg-gray-950 font-bold uppercase p-3 rounded-lg" style={{
                        backgroundColor: isHovered ? 'rgb(0, 0, 0)' : 'rgb(34, 34, 34)',
                    }}>Add Note</button>
                </form>
                {msg && <Alert alert={alert} />}
            </div>
        </>
    )
}

export default NoteModal