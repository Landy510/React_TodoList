
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Index from "./routes/Index";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout/>}>
        <Route index element={<Login/>}></Route>
        <Route 
          path='index' 
          element={
            <ProtectedRoute>
              <Index/>
            </ProtectedRoute>
          }
        ></Route>
      </Route> */}
      <Route path='/login' element={<Login/>}></Route>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout/>    
          </ProtectedRoute>
        }>
          <Route 
            index
            element={<Index/>}
          ></Route>
      </Route>
    </Routes>
  )
}

export default App;