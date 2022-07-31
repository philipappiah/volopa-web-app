import {createContext, useState, useEffect, useContext} from "react"


import { checkUser } from "../APIs"

export const UserContext = createContext({})



export const UserContextProvider = ({ children }) => {

   
    const [userDetail, setUserDetail] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isLoading, setLoading] = useState(true)



    useEffect(() => {
        
        checkUser().then(res=>{
            setLoggedIn(res.data.valid)
            
            setUserDetail(res.data.user)
            setLoading(false)
            

        }).catch(err=>{
            setLoading(false)
            
            console.log(err)
           
        })

    },[isLoggedIn])





    return (
        <UserContext.Provider 
          value={{ 
            userDetail,
            setUserDetail,
            isLoggedIn,
            setLoggedIn,
            isLoading


          }}

          >{children}</UserContext.Provider>
    )


}