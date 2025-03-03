import { useState } from "react"
import Button from "../../components/Button"
import { Link } from "react-router"
import useAuth from "../../hooks/useAuth"
import Alert from "../../components/Alert"


const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)
    const { sendEmailResetPassword } = useAuth()
    const [alert, setAlert] = useState({})


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '') {
            return setAlert({
                msg: 'The field is mandatory',
                error: true
            })
        }
        try {
            setButtonClicked(true)
            const data = await sendEmailResetPassword({ email })
            setAlert({
                msg: data.msg
            })
        } catch (error) {
            console.log(error)
        }

        setButtonClicked(false)
        setTimeout(() => {
            setAlert({})
            setEmail('')
        }, 2000);
    }

    const { msg } = alert


    return (
        <>
            <form className="w-full" onSubmit={handleSubmit}>
                {msg && <Alert alert={alert} />}
                <div className="flex flex-col mt-5">
                    <label htmlFor="email"
                        className="font-bold text-white text-xl block">
                        E-mail
                    </label>
                    <input id="email" type="email"
                        className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                        placeholder="E-mail" autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mt-2">
                    <Button text={"Send Email"} setButtonClicked={buttonClicked} />
                </div>
                <Link to="/" className="text-gray-200 block text-cente hover:scale-105 transition-all ease-in-out duration-200">
                    Do you have an account already? {""}
                    <span className="text-amber-500 font-extrabold ">Login </span></Link>
            </form>
        </>
    )
}

export default ResetPassword