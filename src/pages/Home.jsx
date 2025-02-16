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
      <Header />
      <div className="flex mx-auto  justify-center">
        <Worldmap />
      </div>
      <Footer />
    </>
  )
}

export default Home