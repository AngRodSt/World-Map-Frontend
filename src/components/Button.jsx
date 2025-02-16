import React from 'react';
import styled from 'styled-components';

const Button = ({text}) => {
  return (
    <StyledWrapper>
      <button 
      type='submit'>
        <span>{text}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #172554;
    font-family: "Montserrat", sans-serif;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    border: none;
  }

  button:after {
    content: " ";
    width: 10%;
    height: 100%;
    background: #ffbf00;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
  }

  button:hover::after {
    right: 0;
    left: auto;
    width: 100%;
  }

  button span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 18px 25px;
    color: #fff;
    font-size: 1.125em;
    font-weight: 700;
    letter-spacing: 0.3em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
  }

  button:hover span {
    color: #183153;
    animation: scaleUp 0.3s ease-in-out;
  }

  @keyframes scaleUp {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.95);
    }

    100% {
      transform: scale(1);
    }
  }`;

export default Button;
