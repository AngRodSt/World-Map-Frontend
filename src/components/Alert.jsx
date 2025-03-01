import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const Alert = ({ alert }) => {

    useEffect(() => {
        const { error, msg } = alert
        {
            !error && (
                toast.success(msg)
            )
        }
        {
            error && (
                toast.error(msg)
            )
        }

    }, [alert])

    return (
        <>
            <div><Toaster /></div>
        </>

    );
}

export default Alert;