import './App.css';
import {useContext} from 'react'
import { Route,Routes } from 'react-router-dom'
import WalletDashboard from './App/pages/WalletDashboard';
import Login from './App/pages/Login';
import Register from './App/pages/SignUp';
import { UserContext } from './Contexts/userContext';


function App() {
  const {isLoggedIn} = useContext(UserContext)
  if (!isLoggedIn){
    return (
      <Routes>
         <Route path="/" element={<Login />}/>
         <Route path="/signup" element={<Register />}/>
        
      </Routes>
    )
  }


  return (
    <Routes>
         <Route path="/dashboard" element={<WalletDashboard />}/>
        
        
      </Routes>
  )

 
}

export default App;
