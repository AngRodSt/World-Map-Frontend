import { useContext } from "react";
import WorldMapContext from "../context/WorldMapContext";


const useWorldMap = ()=> {
    return useContext(WorldMapContext)
}

export default useWorldMap