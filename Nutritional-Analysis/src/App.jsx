import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Resources from "./pages/Resources";
import Header from "./components/Header";
export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
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
