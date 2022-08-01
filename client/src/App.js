import './App.css';
import { Spin } from 'antd';
import {useContext} from 'react'
import { Route,Routes, Navigate } from 'react-router-dom'
import WalletDashboard from './App/pages/WalletDashboard';

import Login from './App/pages/Login';
import Register from './App/pages/SignUp';
import { useLocation } from "react-router-dom";
import { UserContext } from './Contexts/userContext';


const PrivateRoute = ( props ) => {
  const { children, isAuth } = props
 
  const location = useLocation()


  return isAuth ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}


function App() {
  const {isLoggedIn, isLoading} = useContext(UserContext)
 
    if(isLoading){
      return (
      <div className="loadingSpinner">
        <Spin />
      </div>
      )
    }
  
    return (
      <Routes>
         <Route path="/" element={<Login />}/>
         <Route path="/signup" element={<Register />}/>
         <Route path="/dashboard" element={<PrivateRoute isAuth={isLoggedIn}><WalletDashboard /></PrivateRoute>}/>


        
      </Routes>
    )
  


 
}

export default App;
