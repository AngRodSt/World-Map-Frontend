import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const { logOut } = useAuth()

  return (
    <>
      <div className="relative poiret-one-regular container mx-auto  py-5  sm:flex-row flex flex-col justify-between items-center">

        <div className="sm:flex-row flex flex-col items-center justify-center gap-2">
          <Link className="bg-white p-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width='20px' height='20px' viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg></Link>
          <Link to='/worldmap'> <h1 className=" text-white shadow-text-black font-extrabold text-2xl   ">World<span className="text-amber-500">sx</span>Map </h1>
          </Link>
        </div>
        <nav className=" flex gap-5 font-bold  text-white">
          <Link to="/worldmap/" className="hover:text-amber-500 hover:scale-125 transition-transform ease-in-out">Home</Link>
          <Link to="/worldmap/notes" className="hover:text-amber-500 hover:scale-125 transition-transform  ease-in-out">Notes</Link>
        </nav>
        <div className="sm:ml-28 mt-5 sm:mt-0">
          <Link to="/" onClick={logOut} ><p className="bg-white text-black px-4 py-1 rounded-md hover:text-white font-bold hover:bg-amber-500 hover:scale-110 transition ease-in-out">Log Out</p></Link>
        </div>
      </div>
    </>
  )
}

export default Header