import { useState, useEffect } from "react"
import Alert from "./Alert";
import useWorldMap from "../hooks/useWorldMap";
import Button from "./Button";




const NoteModal = ({ countryName, countryCode, setIsOpen }) => {
  const [alert, setAlert] = useState([])
  const { saveNote, note, setNote } = useWorldMap()
  const { country, message, name, code, _id } = note
  const MAX_WORDS = 50;
  const [noteLocal, setNoteLocal] = useState({
    message: message || '',
    country: country || '',
    name: name || '',
    code: code || '',
    id: _id || null

  })
  const [buttonClicked, setButtonClicked] = useState(false)



  useEffect(() => {
    setNoteLocal({ ...noteLocal, country: countryName, code: countryCode })
  }, [countryName])


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
    if (!noteLocal.message) {
      setAlert({
        msg: 'The field cannot be empty',
        error: true
      })
      return
    }
    setAlert({})
    setButtonClicked(true)
    try {
      await saveNote(noteLocal)
      setAlert({
        msg: 'Note saved successfully',
      })

    } catch (error) {
      console.log(error.response)
    }
    setButtonClicked(false)

    setTimeout(() => {
      setAlert({})
      setNoteLocal({ ...noteLocal, message: '', name: '' })
      if (setIsOpen) {
        setIsOpen(false)
      }
      setNote({})
    }, 1000);




  }

  const { msg } = alert

  return (
    <>
      {msg && <Alert alert={alert} />}
      <div className="mt-5  ">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="name" className="font-bold text-xl text-gray-700">Name</label>
          <input value={noteLocal.name} onChange={(e) => setNoteLocal({ ...noteLocal, name: e.target.value })} id="name" type="text" placeholder="Name of the person you met (not mandatory)" className="p-2 rounded-lg my-2 bg-gray-100 border" />
          <label htmlFor="messege" className="font-bold text-xl text-gray-700">Notes</label>
          <textarea value={noteLocal.message} onChange={handleChangeTextArea} rows={4} name="messege" id="messege" placeholder="Add Note" className="p-2 rounded-lg my-2 bg-gray-100 border " style={{
            resize: 'none'
          }}></textarea>
          <p className="text-gray-400 mb-4 text-sm">Words: {wordCount}/{MAX_WORDS}</p>
          <Button type="submit" text={`${Object.keys(note).length ? 'Edit Note' : 'Add Note'}`} setButtonClicked={buttonClicked} />
        </form>

      </div>
    </>
  )
}

export default NoteModal
