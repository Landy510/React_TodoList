import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const location = useLocation();
  const canBeAccessed = localStorage.getItem('access_token') ? true : false;

  if(!canBeAccessed) {
    return (
      <Navigate
        to='/'
        state={{pathname: location.pathname}}
      ></Navigate>
    )
  }

  return children;
}

export default ProtectedRoute;