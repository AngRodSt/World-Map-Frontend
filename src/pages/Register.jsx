import { Link } from "react-router"
import Alert from "../components/Alert"
import Button from "../components/Button"
import { useState } from "react"
import axiosClient from "../config/axios"

const Register = () => {
  const [alert, setAlert] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes('')) {
      return setAlert({
        msg: 'All field are mandatory',
        error: true
      })
    }

    if (password !== repeatPassword) {
      return setAlert({
        msg: 'The passwords are differents',
        error: true
      })
    }

    if (password.length < 6) {
      return setAlert({
        msg: 'The password is too short',
        error: true
      })
    }

    setAlert({})
    setButtonClicked(true)
    try {
      await axiosClient.post('/', { name, email, password })
      setAlert({ msg: 'User created Successfully! Verify your email' })
      setTimeout(() => {
        setName("")
        setEmail("")
        setPassword("")
        setRepeatPassword("")
        setAlert({})
      }, 2000);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
    setButtonClicked(false)
  }

  const { msg } = alert
  return (
    <>
      {msg && <Alert alert={alert} />}
      <form onSubmit={handleSubmit} className="w-full">
        <div>
          <label htmlFor="name"
            className="font-bold text-white text-xl block">
            Name
          </label>
          <input id="name" type="name"
            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
            placeholder="Your Name" autoComplete="username"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mt-4">
          <label htmlFor="email"
            className="font-bold text-white text-xl block">
            Email
          </label>
          <input id="email" type="email"
            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
            placeholder="Email" autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
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
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="mt-4">
          <label htmlFor="Repeat-password"
            className="font-bold text-white text-xl block">
            Repeat Password
          </label>
          <input id="repeat-password" type="password"
            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
            placeholder="Repeat Password" autoComplete="current-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)} />
        </div>
        <div className="mt-10">
          <Button text={'Register'} setButtonClicked={buttonClicked} />
        </div>

        <nav className="mt-2 lg:flex lg:justify-between">
          <p className="text-gray-200 block text-center">
            Do you have an account already? {""}
            <Link to="/">Login! </Link></p>
        </nav>
      </form>

    </>
  )
}

export default Register
