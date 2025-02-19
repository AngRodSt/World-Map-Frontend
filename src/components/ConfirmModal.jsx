import React, { useState } from 'react';
import styled from 'styled-components';

const ConfirmModal = ({ onClose, onConfirmDelete }) => {

    const handleDeleteClick = () => {
            onConfirmDelete();
            onClose();
    }

    return (
        <StyledWrapper>
            <div className='card-container'>
                <div className="card">
                    <div className="card-content">
                        <p className="card-heading">Delete Note</p>
                        <p className="card-description">Do you want to delete the note?</p>
                    </div>
                    <div className="card-button-wrapper">
                        <button className="card-button secondary"
                            onClick={onClose}>Cancel</button>
                        <button className="card-button primary"
                            onClick={() => {
                                handleDeleteClick()
                            }}>
                            Delete</button>
                    </div>
                    <button className="exit-button" onClick={onClose}>
                        <svg height="20px" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </button>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  
  .card-container {
    position: fixed;
    top: 0;
    left: 0;
    padding: 5px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
    }
  .card {
    width: 400px;
    height: fix-content;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding: 30px;
    position: relative;
    box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.068);
  }
  .card-content {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .card-heading {
    font-size: 25px;
    font-weight: 700;
    color: rgb(27, 27, 27);
  }
  .card-description {
    font-weight: 100;
    color: rgb(102, 102, 102);
  }
 .card-button-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 10px;
}

@media (min-width: 485px) { 
  .card-button-wrapper {
    flex-direction: row; 
  }
    .card-button {
    width: 50%
    }
}
  .card-button {
    width: 100%;
    height: 35px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
  }
  .primary {
    background-color: #FFC010;
    color: black;
  }
  .primary:hover {
    background-color: #EAAE1C;
  }
  .secondary {
    background-color: #ddd;
  }
  .secondary:hover {
    background-color: rgb(197, 197, 197);
  }
  .exit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .exit-button:hover svg {
    fill: black;
  }
  .exit-button svg {
    fill: rgb(175, 175, 175);
  }`;

export default ConfirmModal;