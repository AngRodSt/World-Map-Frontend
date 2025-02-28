import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";


const Header = () => {

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { auth, logOut } = useAuth();
  const [avatar, setAvatar] = useState()
  const [avatarExist, setAvatarExist] = useState(false)


  useEffect(() => {
    const watchAvatar = () => {
      if (auth && auth.avatar?.data && auth.avatar?.contentType) {
        setAvatar(auth.avatar)
        setAvatarExist(true);
      }
    }
    watchAvatar()

  }, [auth])

  return (
    <>
      <div className="relative mx-10  py-5  sm:flex-row flex flex-col justify-between items-center">
        <div>
          <button onClick={() => setMenuIsOpen(!menuIsOpen)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
          </svg></button>
        </div>
        <div className="poiret-one-regular mb-3 ">
          <Link to='/worldmap'> <h1 className="shadow-text-black font-extrabold text-2xl">World<span className="text-amber-500">sx</span>Map </h1>
          </Link>
        </div>
        <div className="flex justify-center align-middle items-center gap-3">
          <div className="border w-[3rem] h-[3rem]  rounded-full shadow-xl bg-white overflow-hidden flex justify-center items-center">
            <Link to='/worldmap/profile'  className="rounded-full flex justify-center items-center">{avatarExist ? <img src={`data:${avatar.contentType};base64,${avatar.data}`} /> : <svg xmlns="http://www.w3.org/2000/svg" width='20px' height='20px' viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" /></svg>}</Link>
          </div>
          <h2>{auth ? auth.name : '' }</h2>
        </div>
      </div>
      <nav className={` ${menuIsOpen ? 'sm:w-2/6 xl:w-1/6 w-full bg-amber-400 ' : ''} transition-all duration-300 ease-in-out flex-col overflow-hidden pb-10 rounded-md  w-0 absolute right-0 left-0 bottom-0 top-0`} style={{
        zIndex: 9999
      }}>
        <button className="absolute w-3 flex top-2 right-2" onClick={() => setMenuIsOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162 162" className="svgIconCross">
            <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 8.98926L153.021 153" />
            <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 153L153.021 8.98926" />
          </svg>
        </button>
        <h1 className="text-center text-xl font-bold my-20 ml-0 md:ml-1  uppercase">Menu</h1>
        <div className="flex flex-col justify-center pl-2 items-center md:items-baseline lg:px-14  md:pl-[2rem] w-full">
          <Link to='/worldmap' onClick={() => setMenuIsOpen(false)} className="flex gap-4 mb-10 md:w-full items-center hover:scale-105 transition-transform ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`${location.pathname === '/worldmap' ? 'black' : 'gray'}`} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path> <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path> <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path> </svg>
            <button className={` lg:block  block text-start w-full p-1 ${location.pathname === '/worldmap' ? 'border-r-4 border-black ' : 'text-gray-700'}`} >Home</button>

          </Link>
          <Link to='/worldmap/profile' onClick={() => setMenuIsOpen(false)} className="flex gap-4 mb-10  md:w-full items-center hover:scale-105 transition-transform ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`${location.pathname === '/worldmap/profile' ? 'black' : 'gray'}`} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>
            <button className={` lg:block  block text-start w-full p-1 ${location.pathname === '/worldmap/profile' ? 'border-r-4 border-black ' : 'text-gray-700'}  `} >Profile</button>
          </Link>
          <Link to='/worldmap/notes' onClick={() => setMenuIsOpen(false)} className="flex gap-4 mb-10  md:w-full items-center hover:scale-105 transition-transform ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`${location.pathname === '/worldmap/notes' ? 'black' : 'gray'}`} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path> <path d="M9 7l6 0"></path> <path d="M9 11l6 0"></path> <path d="M9 15l4 0"></path> </svg>
            <button className={` lg:block  block text-start w-full p-1 ${location.pathname === '/worldmap/notes' ? 'border-r-4 border-black ' : 'text-gray-700'}  `} >Notes</button>
          </Link>

        </div>
        <div className="mt-10 w-full text-center">
          <Link to="/" onClick={logOut} ><p className=" text-black lg:mx-10 mx-10 md:mx-0 md:ml-1 md:text-sm rounded-md hover:text-white font-bold bg-amber-500 hover:scale-110 transition ease-in-out">Log Out</p></Link>
        </div>

      </nav>
    </>
  )

}

export default Header