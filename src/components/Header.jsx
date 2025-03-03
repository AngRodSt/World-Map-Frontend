import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import Menu from "./Menu";


const Header = () => {

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { auth } = useAuth();
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
      <div className="relative  mx-10  py-5  sm:flex-row flex flex-col justify-between items-center">
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
      <Menu onOpen={menuIsOpen} onClose={()=> setMenuIsOpen(false)}/>
    </>
  )
}

export default Header