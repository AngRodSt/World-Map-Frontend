import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import axiosClient from "../../config/axios";
import Alert from "../../components/Alert";
import Button from "../../components/Button";


const ConfirmNewPassword = () => {
    const { token } = useParams();
    const [alert, setAlert] = useState({})
    const [buttonClicked, setButtonClicked] = useState(false)
    const [form, setForm] = useState({
        password: '',
        repeatPassword: ''
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, repeatPassword } = form

        if (password === '' || repeatPassword === '') {
            return setAlert({
                msg: 'All fields are mandatory',
                error: true
            })
        }
        if (password !== repeatPassword) {
            return setAlert({
                msg: 'Passwords are different',
                error: true
            })
        }
        if (password.length < 6) {
            return setAlert({
                msg: 'Password is too short',
                error: true
            })
        }

        try {
            setButtonClicked(true)
            const url = `/resetPassword/${token}`
            const { data } = await axiosClient.post(url, { password })
            setAlert({ msg: data.url })

            setTimeout(() => {
                navigate('/')
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
            <div className="mt-10 w-full">
                <form className="w-full" onSubmit={handleSubmit}>
                    {msg && <Alert alert={alert} />}
                    <div className="flex flex-col">
                        <label htmlFor="password"
                            className="font-bold text-white text-xl block">
                            Password
                        </label>
                        <input id="password" type="password"
                            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                            placeholder="Password" autoComplete="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="repeatPassword"
                            className="font-bold text-white text-xl block">
                            Repeat Password
                        </label>
                        <input id="repeatPassword" type="password"
                            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                            placeholder="Password" autoComplete="password"
                            value={form.repeatPassword}
                            onChange={(e) => setForm({ ...form, repeatPassword: e.target.value })} />
                    </div>
                    <div className="mt-2">
                        <Button text={"Save Password"} setButtonClicked={buttonClicked} />
                    </div>
                </form>
            </div>

        </>
    )
}

export default ConfirmNewPassword
