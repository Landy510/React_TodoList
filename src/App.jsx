
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Index from "./routes/Index";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Login/>}></Route>
        <Route 
          path='index' 
          element={
            <ProtectedRoute>
              <Index/>
            </ProtectedRoute>
          }
        ></Route>
      </Route>
    </Routes>
  )
}

export default App;