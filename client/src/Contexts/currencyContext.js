import {createContext, useState, useEffect} from "react"

import { getCurrencies } from "../APIs"

export const CurrencyContext = createContext({})



export const CurrencyContextProvider = ({ children }) => {

    const [currencies, setCurrencies] = useState([])
   



    useEffect(() => {
        
        getCurrencies().then(data=>{
            setCurrencies(data)

        })

    },[])





    return (
        <CurrencyContext.Provider 
          value={{ 
           currencies

          }}

          >{children}</CurrencyContext.Provider>
    )


}