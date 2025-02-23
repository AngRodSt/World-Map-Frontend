import React from 'react';
import styled from 'styled-components';


const Button = ({ text, setButtonClicked }) => {

  return (
    <StyledWrapper >
      <button className={` ${setButtonClicked? 'after:bg-amber-200 bg-amber-200 pointer-events-none' : 'after:bg-amber-400 bg-gray-700'} `}
        type='submit' disabled={setButtonClicked? true : false}>

        <span className='flex justify-center items-center gap-5 '>
          {setButtonClicked && (
            <div className="sk-fading-circle">
              <div className="sk-circle1 sk-circle"></div>
              <div className="sk-circle2 sk-circle"></div>
              <div className="sk-circle3 sk-circle"></div>
              <div className="sk-circle4 sk-circle"></div>
              <div className="sk-circle5 sk-circle"></div>
              <div className="sk-circle6 sk-circle"></div>
              <div className="sk-circle7 sk-circle"></div>
              <div className="sk-circle8 sk-circle"></div>
              <div className="sk-circle9 sk-circle"></div>
              <div className="sk-circle10 sk-circle"></div>
              <div className="sk-circle11 sk-circle"></div>
              <div className="sk-circle12 sk-circle"></div>
            </div>
          )}
          {text}
        </span>
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
    
    
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    
  }

  button:after {
    content: "";
    width: 0%;
    height: 100%;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
  }

  button:hover::after {
    right: 0;
    left: auto;
    width: 100%;
  }

  button span, {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 15px 0px;
    color: #fff;
    font-size: 1.125em;
    font-weight: 700;
    letter-spacing: 0.3em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
  }

  button:hover span, div {
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
