import { Navigate, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const ProtectedRoute = ({children}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [checkResult, setCheckResult] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const timerWorker = useRef(undefined);

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
          const jwtToken = localStorage.getItem('access_token').split('Bearer ')[1];
          const expireDate = jwt_decode(jwtToken).exp
          timerWorker.current = new Worker('../../worker.js');
          timerWorker.current.onmessage = async ({data}) => {
            switch(data) {
              case 'logout':
                try {
                  const url = 'https://todoo.5xcamp.us/users/sign_out';
                  const logout = await axios.delete(url, {
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `${localStorage.getItem('access_token') || ''}`
                    }
                  })
                  localStorage.getItem('access_token') && localStorage.clear('access_token');
                  localStorage.getItem('user_name') && localStorage.clear('user_name');
                  navigate('/login');
                  timerWorker.current.terminate();
                }
                catch(err) {
                  console.log('logout error', err);
                  timerWorker.current.terminate();
                }

              break;
            }
          }

          const data = {
            mission: 'start',
            expireDate
          }
          timerWorker.current.postMessage(data)

          setIsLoading(false);
          setCheckResult(true);
        }
        catch {
          setIsLoading(false);
          setCheckResult(false);
        }
      }
    )()

    return () => {
      if(timerWorker.current) {
        const data ={ mission: 'stop'}
        timerWorker.current.postMessage(data);
      }
    }
  }, [])

  if(!isLoading) {
    return !checkResult ? <Navigate to='/login' state={{pathname: location.pathname}}></Navigate> : children;
  }
  return (
    <>Loading...</>
  )

  
}

export default ProtectedRoute;