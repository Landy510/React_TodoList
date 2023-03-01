
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Index from "./routes/Index";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Login/>}></Route>
        <Route path='index' element={<Index/>}></Route>
      </Route>
    </Routes>
  )
}

export default App;