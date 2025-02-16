import { use, useEffect, useState } from "react"
import useWorldMap from "../hooks/useWorldMap"
import NoteModal from "./NoteModal"
import styled from 'styled-components';
import Modal from "react-modal";


const Note = ({ note, }) => {
    const [flag, setFlag] = useState({})
    const { country, date, message, name, code, _id } = note
    const { deleteNote, editNote, setNote } = useWorldMap();
    const [isOpen, setIsOpen] = useState(false)

    const handleCloseModal = ()=>{
        setIsOpen(false)
        setNote({})
    }

     useEffect(() => {
        Modal.setAppElement('#root');
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
    }, [])

    const handleDeleteClick = () => {
        deleteNote(_id)
    }

    const handleEditClick = () => {
        editNote(note)
        setIsOpen(true)
    }



    return (
        <>
           
            <div data-aos="flip-right" className=" bg-gray-100 rounded-lg  overflow-hidden transition ease-in-out" style={{
                boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}>
                <div className="   grid grid-cols-1 grid-rows-1 relative w-full h-full overflow-hidden">
                    <button className="absolute w-3 flex top-2 right-2" onClick={handleDeleteClick} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 162 162" className="svgIconCross">
                            <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 8.98926L153.021 153" />
                            <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 153L153.021 8.98926" />
                        </svg>
                    </button>
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
                            <div className="absolute bottom-3 left-2 gap-3 flex flex-row w-full z-10">
                                <button onClick={handleEditClick} className=" shadow-lg bg-gray-900 p-1 w-1/4 rounded-2xl text-white " >Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 162 162" className="svgIconCross">
                            <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 8.98926L153.021 153" />
                            <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 153L153.021 8.98926" />
                        </svg>
                    </button>
               
                {<NoteModal setIsOpen={setIsOpen} />}
                
            </Modal >
        </>
    )
}
const StyledWrapper = styled.div`
  
  .cookie-heading {
    color: rgb(34, 34, 34);
    font-weight: 800;
  }
  .cookie-para {
    font-size: 11px;
    font-weight: 400;
    color: rgb(51, 51, 51);
  }
  .button-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .cookie-button {
    padding: 8px 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .accept {
    background-color: rgb(34, 34, 34);
    color: white;
  }
  .reject {
    background-color: #ececec;
    color: rgb(34, 34, 34);
  }
  .accept:hover {
    background-color: rgb(0, 0, 0);
  }
  .reject:hover {
    background-color: #ddd;
  }
  .exit-button {
   
    top: 17px;
    right: 17px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .exit-button:hover {
    background-color: #ddd;
    color: white;
  }
  .svgIconCross {
    height: 10px;
  }`;


export default Note