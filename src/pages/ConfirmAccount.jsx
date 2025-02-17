import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axiosClient from "../config/axios";
import Alert from "../components/Alert";
import Button from "../components/Button";
import { Link } from "react-router";

const ConfirmAccount = () => {
    const { token } = useParams();
    const [alert, setAlert] = useState({})
    const [verified, setVerified] = useState(false);
    const [charging, setCharging] = useState(true);



    useEffect(() => {
        const authAccount = async () => {
            try {
                const url = `/confirm/${token}`
                const { data } = await axiosClient(url)
                console.log(data.url)
                setVerified(true)
                setAlert({ msg: data.url })
            } catch (error) {
                setAlert({ msg: error.response.data.msg, error: true })
            }
            setCharging(false)
        }
        authAccount()
    }, [])

    return (
        <>
            {!charging && <Alert alert={alert} />}

            <div className="mt-10">
                {verified && 
                (<Link to="/"> {<Button text={'Login! →'}/>}</Link>
                )}
            </div>

        </>
    )
}

export default ConfirmAccount
