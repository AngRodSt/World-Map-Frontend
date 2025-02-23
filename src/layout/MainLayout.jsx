import { Outlet, Navigate } from "react-router"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Footer from "../components/Footer";


const MainLayout = () => {

  const { auth, charging } = useAuth();
  if (charging) return 'Charging...'

  return (
    <>

      <Header/>
      <div className={`relative w-full`}>
        {auth?._id ?? false ? <Outlet /> : <Navigate to="/" />}
      </div>
      <Footer/>


    </>


  )
}

export default MainLayout