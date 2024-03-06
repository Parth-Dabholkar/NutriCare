import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Resources from "./pages/Resources";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Signin" element={<SignIn/>}/>
          <Route path="/Signout" element={<SignOut/>}/>
          <Route path="/Resources" element={<Resources/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
