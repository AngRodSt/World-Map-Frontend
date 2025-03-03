import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";


const Menu = ({ onOpen, onClose }) => {

  const { logOut } = useAuth();

  return (
    <nav className={` ${onOpen ? 'sm:w-2/6 xl:w-1/6 w-full bg-amber-400 ' : ''} transition-all duration-300 ease-in-out flex-col overflow-hidden  rounded-md  w-0 absolute right-0 left-0 bottom-0 top-0 min-h-screen `} style={{
      zIndex: 9999
    }}>
      <button className="absolute w-3 flex top-2 right-2" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162 162" className="svgIconCross">
          <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 8.98926L153.021 153" />
          <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 153L153.021 8.98926" />
        </svg>
      </button>
      <h1 className="text-center text-xl font-bold my-20 ml-0 md:ml-1  uppercase">Menu</h1>
      <div className="flex flex-col justify-center pl-2 items-center md:items-baseline lg:px-14  md:pl-[2rem] w-full">
        <Link to='/worldmap' onClick={onClose} className="flex gap-4 mb-10 md:w-full items-center hover:scale-105 transition-transform ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`${location.pathname === '/worldmap' ? 'black' : 'gray'}`} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path> <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path> <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path> </svg>
          <button className={` lg:block  block text-start w-full p-1 ${location.pathname === '/worldmap' ? 'border-r-4 border-black ' : 'text-gray-700'}`} >Home</button>

        </Link>
        <Link to='/worldmap/profile' onClick={onClose} className="flex gap-4 mb-10  md:w-full items-center hover:scale-105 transition-transform ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`${location.pathname === '/worldmap/profile' ? 'black' : 'gray'}`} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>
          <button className={` lg:block  block text-start w-full p-1 ${location.pathname === '/worldmap/profile' ? 'border-r-4 border-black ' : 'text-gray-700'}  `} >Profile</button>
        </Link>
        <Link to='/worldmap/notes' onClick={onClose} className="flex gap-4 mb-10  md:w-full items-center hover:scale-105 transition-transform ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`${location.pathname === '/worldmap/notes' ? 'black' : 'gray'}`} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path> <path d="M9 7l6 0"></path> <path d="M9 11l6 0"></path> <path d="M9 15l4 0"></path> </svg>
          <button className={` lg:block  block text-start w-full p-1 ${location.pathname === '/worldmap/notes' ? 'border-r-4 border-black ' : 'text-gray-700'}  `} >Notes</button>
        </Link>

      </div>
      <div className="mt-10 w-full text-center">
        <Link to="/" onClick={logOut} ><p className=" text-black lg:mx-10 mx-10 md:mx-0 md:ml-1 md:text-sm rounded-md hover:text-white font-bold bg-amber-500 hover:scale-110 transition ease-in-out">Log Out</p></Link>
      </div>

    </nav>
  )
}

export default Menu