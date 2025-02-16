import { Outlet } from "react-router"

const PublicLayout = () => {
  return (
    <>
      <main className=" absolute inset-0 h-full bg-[url(/LoginImagen.jpg)] bg-cover bg-no-repeat bg-fixed filter transition-opacity ">
        <div className=" absolute inset-0 h-full bg-gradient-to-r from-blue-800/70 to-amber-600/70 bg-cover bg-no-repeat bg-fixed filter transition-opacity ">
          <div className="flex justify-center items-center h-screen">
            <div className="  backdrop-blur-xl  rounded-3xl  w-[30rem] p-10 " style={{
              boxShadow: "rgba(0, 0, 0, 0.20) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
            }}>
              <div>
                <h1 className="roboto-slab text-center text-2xl font-bold text-white ">Welcome to WorldMap <span className="text-blue-950 shadow-text-black font-extrabold text-8xl covered-by-your-grace-regular  block">W<span className="text-amber-500">sx</span>M</span> </h1>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>


    </>
  )
}

export default PublicLayout