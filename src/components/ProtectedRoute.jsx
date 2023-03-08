import { Navigate, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = ({children}) => {
  const location = useLocation();
  const [checkResult, setCheckResult] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        try {
          const result = await axios.get('https://todoo.5xcamp.us/check', {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${localStorage.getItem('access_token') || ''}`
            }
          })
          setIsLoading(false);
          setCheckResult(true);
        }
        catch {
          setIsLoading(false);
          setCheckResult(false);
        }
      }
    )()
  }, [])

  if(!isLoading) {
    return !checkResult ? <Navigate to='/login' state={{pathname: location.pathname}}></Navigate> : children;
  }
  return (
    <>Loading...</>
  )

  
}

export default ProtectedRoute;