import axios from 'axios'
import { API_URL } from '../Constants'


  function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken;
  }
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials:true
    
  });
  
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 404 && err.response.data.message === "token expired") {
        
          try {
            return Promise.resolve(refreshToken());
           
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 401 && err.response.data) {
           
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    }
  );

  function refreshToken() {
   
    return instance.post("api/v1/auth/refreshtoken", {
      refreshToken: getLocalRefreshToken(),
    });
  }
  

export async function checkUser () {
     
      return instance.get(`${API_URL}/api/v1/auth/isLoggedIn`,{withCredentials:true})
    
    

}  


export function logout () {

    axios.get(`${API_URL}/api/v1/auth/logout`,{withCredentials:true}).then(res=>{
        document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        window.localStorage.setItem("refreshToken","");
        window.location.href="/"

    }).catch(err =>{

    })
}


export async function getCurrencies () {
    const currencies = await axios.get(`${API_URL}/api/v1/currencies`,{withCredentials:true})
    return currencies.data

}

export async function getConversion (from, to, amnt){
    const conversion = await axios.get(`${API_URL}/api/v1/currencies/convert?from=${from}&to=${to}&amount=${amnt}`)
    return conversion
 }