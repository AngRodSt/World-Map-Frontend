import { Outlet, Navigate } from "react-router"
import useAuth from "../hooks/useAuth"


const MainLayout = () => {

  const {auth, charging} = useAuth();
  if (charging) return 'Charging...'

  return (
    <>
    {auth?._id ?? false ? <Outlet/> : <Navigate to="/" />}
    </>

    
  )
}

export default MainLayout