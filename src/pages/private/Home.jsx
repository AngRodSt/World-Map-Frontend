import Modal from "react-modal";
import { useEffect } from "react";
import Worldmap from "../../components/Worldmap"


const Home = () => {

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <>
        <div className=" justify-center items-center m-4  md:mt-0">
          <Worldmap />
        </div>      
    </>
  )
}

export default Home