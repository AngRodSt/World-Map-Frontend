import { use, useEffect, useState } from "react"
import useWorldMap from "../hooks/useWorldMap"
import NoteModal from "./NoteModal"
import styled from 'styled-components';
import Modal from "react-modal";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import ConfirmModal from "./ConfirmModal";



const Note = ({ note, }) => {
    const [flag, setFlag] = useState({})
    const { country, date, message, name, code, _id } = note
    const { deleteNote, editNote, setNote } = useWorldMap();
    const [isOpen, setIsOpen] = useState(false)
    const [confirmIsOpen, setConfirmIsOpen] = useState(false)

    const handleCloseModal = ()=>{
        setIsOpen(false)
        setNote({})
    }

     useEffect(() => {
        Modal.setAppElement('#root');
      }, []);

      

      useEffect(() => {
        AOS.init({
          duration: 1000, 
          once: false,
        });
      }, []);

    const formatDate = (date) => new Date(date).toISOString().split('T')[0];
    let lowCode = code.toLowerCase()

    useEffect(() => {
        const getFlag = async () => {
            try {
                setFlag(`https://flagcdn.com/${lowCode}.svg`);
            } catch (error) {
            }
        }
        getFlag()

    }, [note])

    

    const handleEditClick = () => {
      editNote(note);
      setIsOpen(true)
        
    }


    return (
        <>
           
            <div data-aos="fade-up" className=" bg-gray-200 rounded-lg  overflow-hidden transition ease-in-out" style={{
                boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}>
                <div className="   grid grid-cols-1 grid-rows-1 relative w-full h-full overflow-hidden">
                    
                    <div >

                        <div className="m-4 flex items-center gap-5">
                            <img src={flag} alt="" className="w-6 h-4 mb-2" />
                            <h3 className="text-xs text-gray-800">{formatDate(date)}</h3>
                        </div>
                        <div className=" pb-20">
                            <div className=" px-4  " style={{
                                background: " rgb(245, 245, 245)",
                                boxShadow: "rgb(245, 245, 245)  0px 0px 3rem 5rem",
                                marginTop: "5%",
                            }}>
                                <h3 className=" text-2xl ">{name}</h3>
                                <div className="font-light mt-2 break-words">
                                    <p className="mb-2"> {country} </p>
                                    <p className="mb-2">{message}</p>

                                </div>
                            </div>
                            <div className="absolute bottom-3 gap-3 flex flex-row w-full z-10">
                                <button onClick={handleEditClick} className=" shadow-lg bg-gray-900 p-1 mx-2 w-1/2 rounded-md text-white hover:bg-black hover:scale-105 transition-transform ease-in-out" >Edit</button>
                                <button onClick={()=> setConfirmIsOpen(true)} className=" shadow-lg bg-amber-400 p-1 mx-2 w-1/2 rounded-md  hover:bg-amber-500 hover:scale-105 transition-transform ease-in-out" >Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {confirmIsOpen && <ConfirmModal onClose={()=> setConfirmIsOpen(false)} onConfirmDelete={()=> {deleteNote(_id)}}/>}
            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Paleta de Colores"
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: '9999'
                    },
                    content: {
                        height: "fit-content",
                        maxWidth: "700px",
                        margin: 'auto',
                        backgroundColor: " rgb(255, 250, 250)",
                        borderRadius: "10px",
                        border: "1px solid rgb(206, 206, 206)",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.066)"
                    }
                }}
            >
                <button className="absolute w-3 flex top-2 right-2" onClick={handleCloseModal} >
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 162 162" className="svgIconCross">
                            <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 8.98926L153.021 153" />
                            <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 153L153.021 8.98926" />
                        </svg>
                    </button>
               
                {<NoteModal setIsOpen={setIsOpen} />}
            </Modal >
           
        </>
    )
}


export default Note
