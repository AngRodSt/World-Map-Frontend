import Modal from "react-modal";
import { ChromePicker } from "react-color"
import styled from 'styled-components';
import { useState, useEffect } from "react"
import L from "leaflet"
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import NoteModal from "./NoteModal";

const ModalStructure = ({ modalIsOpen, setModalIsOpen, countryName, countryCode, selectedContry, selectedColor, setSelectedColor, onAccept, onDelete }) => {
  const [color, setColor] = useState('#fff')

  const handleCloseModal = () => { setModalIsOpen(false) }

  const handleChange = (color) => {
    setColor(color.hex)
    setSelectedColor(color.hex)
  }

  const CenterMap = ({ selectedContry }) => {
    const map = useMap();
    useEffect(() => {
      if (selectedContry) {
        const geoJsonLayer = L.geoJSON(selectedContry);
        const bounds = geoJsonLayer.getBounds();
        map.fitBounds(bounds);
      }
    }, [selectedContry, map]);
    return null;
  };


  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Paleta de Colores"
        shouldCloseOnOverlayClick={false}
        className={''}
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
        <div className=" overflow-y-auto sm:max-h-[50rem] max-h-[30rem] ">
        <StyledWrapper>
          <div className="absolute right-0 mr-1 top-2 ">
            <button className="exit-button " onClick={handleCloseModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 162 162" className="svgIconCross">
                <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 8.98926L153.021 153" />
                <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 153L153.021 8.98926" />
              </svg>
            </button>
          </div>
          <div className="flex md:flex-row flex-col gap-5 px-4 w-auto justify-center items-center ">
            <div className="sm:w-1/2 w-full">
              <h1 className="text-center font-bold text-xl">{countryName}</h1>
              <MapContainer className="" center={[34, 66]} zoom={5} style={{ height: "300px", width: "100%" }} >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {<GeoJSON data={selectedContry} />}
                {<CenterMap selectedContry={selectedContry} />}
              </MapContainer>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center ">
              <p className="cookie-heading text-center">Select Color</p>
              <p className="cookie-para text-center">
                Select your favorite color to fill the contry
              </p>
              <ChromePicker color={color} onChange={handleChange} />

              <div className="button-wrapper mt-5 flex flex-col md:flex-row">
                <button className="reject cookie-button w-full md:w-1/2 " onClick={() => onDelete()}>Delete Color</button>
                <button className="accept cookie-button w-full md:w-1/2" onClick={() => onAccept(selectedColor)} >Add Color</button>
              </div>
            </div>
          </div>
          <NoteModal countryCode={countryCode} countryName={countryName} />
        </StyledWrapper>
        </div>
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
   
    top: 0px;
    right: 0px;
    width: 20px;
    height: 20px;
    display: fixed;
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

export default ModalStructure
