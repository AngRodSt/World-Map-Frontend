import { Link, useNavigate } from "react-router-dom"
import Alert from "../components/Alert"
import Button from "../components/Button"
import { useState } from "react"
import axiosClient from "../config/axios"
import useAuth from "../hooks/useAuth"



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)
  const navigate = useNavigate()

  const {auth, setAuth} = useAuth()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    if([email, password].includes('')){
      return setAlert({
        msg: 'All field are mandatory',
        error: true
      })
    }
    setButtonClicked(true)
    try {
      const url = '/login'
      const {data} = await axiosClient.post(url, {email, password})
      localStorage.setItem('MapToken', data.token)
      setAuth(data)
      
      navigate('/worldmap')
    } catch (error) {
      setAlert({
        msg: error.response?.data?.msg || 'Hubo un error',
        error: true
      })
    }
    setButtonClicked(false)
  }

  const {msg} = alert

  return (
    <>
    {msg && <Alert alert={alert} />}
    <form onSubmit={handleSubmit} className="w-full mt-5 ">
            <div>
              <label htmlFor="email"
                className="font-bold text-white text-xl block">
                E-mail
              </label>
              <input id="email" type="email"
                className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                placeholder="E-mail" autoComplete="username"
                value={email}
                onChange={(e)=> setEmail(e.target.value)} />
            </div>

            <div className="mt-4">
              <label htmlFor="password"
                className="font-bold text-white text-xl block">
                Password
              </label>
              <input id="password" type="password"
                className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                placeholder="Password" autoComplete="current-password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)} />
            </div>
             <div className={` items-center flex-col justify-center  mt-10`}>
              
            </div> 
            <div className="mt-10">
              <Button text={"Login"} setButtonClicked={buttonClicked}/>

            </div>

            <nav className="mt-2 lg:flex lg:justify-between">
              <p className="text-gray-200 block text-center">
                Don't have an account? {""}
                <Link to="/register">Register </Link></p>
            </nav>
            </form>
    
    </>
  )
}

export default Login
