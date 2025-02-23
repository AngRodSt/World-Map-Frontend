import Header from "../../components/Header"
import Modal from "react-modal";
import { useEffect } from "react";
import Footer from "../../components/Footer"
import Worldmap from "../../components/Worldmap"



const Home = () => {

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <>
        <div className="flex justify-center items-center m-4 md:mt-0">
          <Worldmap />
        </div>
        <Footer />
      
    </>
  )
}

export default Home