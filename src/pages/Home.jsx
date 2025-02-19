import Header from "../components/Header"
import Modal from "react-modal";
import { useEffect } from "react";
import Footer from "../components/Footer"
import Worldmap from "../components/Worldmap"



const Home = () => {

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <>
      <main className=" absolute poiret-one-regular w-full min-h-screen bg-[url(/backgroud1.jpg)] bg-cover bg-no-repeat bg-fixed filter ">
        <Header />
        <div className="flex justify-center items-center mt-10 md:mt-0">
          <Worldmap />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Home