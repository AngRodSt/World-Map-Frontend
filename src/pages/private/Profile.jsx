import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import Alert from "../../components/Alert"
const Profile = () => {

    const { auth, updateProfile } = useAuth()
    const [alert, setAlert] = useState({})
    const [avatarExist, setAvatarExist] = useState(false)

    useEffect(() => {
        const watchAvatar = () => {
            if (auth.avatar) {
                setAvatarExist(true)
            }
        }
        watchAvatar()

    }, [])


    const [profile, setProfile] = useState({
        id: auth._id || null,
        avatar: auth.avatar || null,
        name: auth.name || '',
        bio: auth.bio || '',
        phone: auth.phone || '',
        birthDate: auth.birthDate ? new Date(auth.birthDate).toISOString().split('T')[0] : '',
        profession: auth.profession || ''
    })

    const [buttonClicked, setButtonClicked] = useState(false)
    const [preview, setPreview] = useState(null)
    const [edit, setEdit] = useState(false)
    const formData = new FormData();


    const handleChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setProfile({ ...profile, avatar: e.target.files[0] })
        setAvatarExist(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let key in profile) {
            formData.append(key, profile[key])
        }
        try {
            setButtonClicked(true)
            await updateProfile(profile)

        } catch (error) {
            console.log(error)
        }
        setAlert({
            msg: 'User updated sucessfully'
        })
        setButtonClicked(false)
        setTimeout(() => {
            setAlert({})
            setEdit(false)
        }, 2000);
    }

    const { msg } = alert

    return (

        <>
            <main className="container mx-auto pb-20 px-20 pt-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-5 ">
                    <div className="flex flex-col sm:flex-row items-center  gap-5">
                        <div className={`${edit ? 'hover:scale-110 ' : ''}  border w-[6rem] h-[6rem] transition-all ease-in-out duration-300  rounded-full shadow-xl bg-white overflow-hidden`}>
                            <label htmlFor="avatar" className="w-[6rem] h-[6rem] flex justify-center items-center">
                                {avatarExist ?
                                    <img src={`data:${profile.avatar.contentType};base64,${profile.avatar.data}`} /> : preview ? <img src={preview} alt="" className={`${edit ? 'opacity-50' : ''} hover:opacity-100 transition-all ease-out`} /> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke='black' strokeLinecap="round" strokeLinejoin="round" width="48" height="48" strokeWidth="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>}
                            </label>
                        </div>
                        <input
                            type="file"
                            disabled={edit ? false : true}
                            id="avatar"
                            name="avatar"
                            accept=".jpg, .jpeg, .png"
                            className="hidden"
                            onChange={handleChange} />

                        <div className=" flex flex-col justify-center sm:items-start items-center">
                            <h2>{profile.name}</h2>
                            <p className="text-sm text-gray-400">{profile.profession}</p>
                        </div>
                    </div>

                    <button className="border   bg-amber-400 hover:bg-gray-700 p-4 rounded-full mr-0 sm:mr-4 hover:scale-110 transition-transform ease-in-out" onClick={() => setEdit(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" strokeWidth="2"> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path> <path d="M13.5 6.5l4 4"></path> </svg>                     </button>
                </div>

                <div className="mt-10 flex ">
                    <form className="w-full " onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="bio" className="font-bold block"> Bio </label>
                            <textarea id="bio" type="bio"
                                disabled={edit ? false : true}
                                className={`${edit ? 'bg-gray-50' : 'bg-gray-300 text-gray-500'} border p-2 mt-3 w-full rounded-lg`}
                                placeholder="Add Bio" autoComplete="bio"
                                value={profile.bio}
                                rows={'2'}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })} style={{
                                    resize: 'none'
                                }} />
                        </div>
                        <div className="flex justify-between sm:flex-row flex-col align-middle gap-10">
                            <div className="w-full">
                                <label htmlFor="name"
                                    className="font-bold block"> Name </label>
                                <input id="name" type="name"
                                    disabled={edit ? false : true}
                                    className={`${edit ? 'bg-gray-50' : 'bg-gray-300 text-gray-500'} border p-2 mt-3 w-full rounded-lg`}
                                    placeholder="Your Name" autoComplete="username"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

                                <label htmlFor="birthDate" className="font-bold block mt-5"> Birth Date </label>
                                <input id="birthDate" type="date"
                                    disabled={edit ? false : true}
                                    className={`${edit ? 'bg-gray-50' : 'bg-gray-300 text-gray-500'} border p-2 mt-3 w-full rounded-lg`}
                                    autoComplete="date"
                                    value={profile.birthDate}
                                    onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })} />
                            </div>

                            <div className="w-full">
                                <label htmlFor="phone" className="font-bold  block"> Phone Number </label>
                                <input id="phone" type="text"
                                    disabled={edit ? false : true}
                                    className={`${edit ? 'bg-gray-50' : 'bg-gray-300 text-gray-500'} border p-2 mt-3 w-full rounded-lg`}
                                    placeholder="Phone Number" autoComplete="current-password"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />

                                <label htmlFor="profession" className="font-bold mt-5 block"> Profession </label>
                                <input id="profession" type="text"
                                    disabled={edit ? false : true}
                                    className={`${edit ? 'bg-gray-50' : 'bg-gray-300 text-gray-500'} border p-2 mt-3 w-full rounded-lg`}
                                    placeholder="Profession" autoComplete="current-password"
                                    value={profile.profession}
                                    onChange={(e) => setProfile({ ...profile, profession: e.target.value })} />
                            </div>
                        </div>
                        <div className="mt-10">
                            {edit && <Button text={'Save Changes'} setButtonClicked={buttonClicked} />}
                            {msg && <Alert alert={alert} />}
                        </div>
                    </form>
                </div>
            </main>







        </>
    )
}

export default Profile