import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { useState } from "react"

const Profile = () => {

    const [alert, setAlert] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)

    return <>

        <main className=" absolute w-full min-h-screen bg-[url(/backgroud1.jpg)] bg-cover bg-no-repeat bg-fixed filter ">
            <Header />
            <div className=" flex justify-center p-2">
            <div className="bg-white flex item mx-10 rounded-md shadow-lg max-w-[80rem] container ">
                <aside className="w-1/4 border pb-10 rounded-md">
                    <h1 className="text-center text-xl font-bold my-5">User Profile</h1>
                    <nav className="flex gap- justify-center">
                        <div className="flex flex-col justify-center -ml-14 items-end gap-7 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1"> <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path> </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1"> <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path> </svg>
                        </div>
                        <div className="flex flex-col  items-start gap-5 w-full">
                            <button className=" text-start w-full p-1 border-r-4 border-amber-400 ">User info</button>
                            <button className="text-gray-400 text-start w-full p-1 ">Favorites</button>
                            <button className="text-gray-400 text-start w-full p-1">Setting</button>

                        </div>


                    </nav>
                </aside>
                <section className="w-3/4  p-20  ">
                    <div className="flex gap-5">
                        <div className="border  p-4 rounded-full shadow-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width='4rem' height='4rem' viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" /></svg>
                        </div>
                        <div className=" flex flex-col justify-center">
                            <h2>Sthefany Angeles Rodriguez</h2>
                            <p className="text-sm text-gray-400">Software Engineer</p>
                        </div>
                    </div>


                    <div className="mt-10 flex ">
                        <form  className="w-full ">
                            <div className="mb-4">
                            <label htmlFor="bio"
                                    className="font-bold block">
                                    Bio
                                </label>
                                <textarea id="name" type="name"
                                    className="border p-2 mt-3 w-full bg-gray-50 rounded-lg"
                                    placeholder="Add Bio" autoComplete="username"
                                    value={name}
                                    rows={'2'}
                                    onChange={(e) => setName(e.target.value)} style={{
                                        resize: 'none'
                                    }} />
                            </div>
                            <div className="flex justify-between align-middle gap-10">
                            <div className="w-full">
                                <label htmlFor="name"
                                    className="font-bold block">
                                    Name
                                </label>
                                <input id="name" type="name"
                                    className="border p-2 mt-3 w-full bg-gray-50 rounded-lg"
                                    placeholder="Your Name" autoComplete="username"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            
                            
                                <label htmlFor="email"
                                    className="font-bold mt-5 block">
                                    Email
                                </label>
                                <input id="email" type="email"
                                    className="border p-2 mt-3 w-full bg-gray-50 rounded-lg"
                                    placeholder="Email" autoComplete="username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                           
                            </div>

                            <div className="w-full">
                                <label htmlFor="tel"
                                    className="font-bold  block">
                                    Phone Number
                                </label>
                                <input id="number" type="text"
                                    className="border p-2 mt-3 w-full bg-gray-50 rounded-lg"
                                    placeholder="Password" autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                           
                                <label htmlFor="profession"
                                    className="font-bold mt-5 block">
                                   Profession
                                </label>
                                <input id="profession" type="text"
                                    className="border p-2 mt-3 w-full bg-gray-50 rounded-lg"
                                    placeholder="Profession" autoComplete="current-password"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)} />
                           
                            </div>
                            </div>
                            
                            
                            {/* <div className="mt-10">
          <Button text={'Register'} setButtonClicked={buttonClicked} />
        </div> */}


                        </form>

                    </div>

                </section>
            </div>
            </div>
            <Footer />
        </main>




    </>
}

export default Profile