import { Navigate, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";

const loadData = (access) => {
  const [accessState, setAccessState] = useState(false);
  console.log('Hello123s')
  useEffect(() => {
    axios.get('https://todoo.5xcamp.us/check', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem('access_token') || ''}`
        }
      })
      .then(res => {
        return setAccessState(true);
      })
      .catch(err => {
        console.log('check error', err);
        return setAccessState(false);
      })
  }, [])

  return accessState;
}

const ProtectedRoute = ({children}) => {
  const location = useLocation();
  const result = loadData(false);

  if(!result) {
    return (
      <Navigate
        to='/index'
        state={{pathname: location.pathname}}
      ></Navigate>
    )
  }
  return children;
}

export default ProtectedRoute;