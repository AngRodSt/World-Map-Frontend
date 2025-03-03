import { useContext } from "react";
import CountryContext from "../context/CountryContext";


const useCountry = ()=> {
    return useContext(CountryContext)
}

export default useCountry