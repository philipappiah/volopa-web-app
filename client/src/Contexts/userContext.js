import {createContext, useState, useEffect} from "react"

import { checkUser } from "../APIs"

export const UserContext = createContext({})



export const UserContextProvider = ({ children }) => {

    const [userDetail, setUserDetail] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false)



    useEffect(() => {
        
        checkUser().then(res=>{
            setLoggedIn(res.data.valid)
            setUserDetail(res.data.user)
           

        }).catch(err=>{
            console.log(err)
           
        })

    },[])





    return (
        <UserContext.Provider 
          value={{ 
            userDetail,
            setUserDetail,
            isLoggedIn,
            setLoggedIn


          }}

          >{children}</UserContext.Provider>
    )


}