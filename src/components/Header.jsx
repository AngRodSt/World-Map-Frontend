import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const { logOut } = useAuth()

  return (
    <>
      <div className="relative roboto-slab container mx-auto py-5 gap-2 sm:flex-row flex flex-col justify-between items-center">

        <div className="">
          <Link to='/worldmap'> <h1 className="roboto-slab text-blue-950 shadow-text-black font-extrabold text-4xl covered-by-your-grace-regular  ">World<span className="text-amber-500">sx</span>Map </h1>
          </Link>
        </div>
        <nav className=" flex  gap-5">
          <Link to="/worldmap/" className="hover:text-amber-600 hover:scale-125 transition-transform ease-in-out">Home</Link>
          <Link to="/worldmap/notes" className="hover:text-amber-600 hover:scale-125 transition-transform  ease-in-out">Notes</Link>
        </nav>
        <div>
          <Link to="/" onClick={logOut} ><p className="bg-blue-950 px-4 py-1 rounded-3xl text-white hover:bg-amber-600 hover:scale-110 transition ease-in-out">Log Out</p></Link>
        </div>
      </div>
    </>
  )
}

export default Header