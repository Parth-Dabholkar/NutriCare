import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import DietRecommender from "./pages/DietRecommender";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import Signup from "./pages/Signup";
import BMI from "./pages/BMI";
import FoodAnalysis from "./pages/FoodAnalysis";
import ChatBot from "./pages/ChatBot";
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
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Resources/CreateRecipe" element={<DietRecommender/>}/>
          <Route path="/Resources/BMI" element={<BMI/>}/>
          <Route path="/Resources/FoodAnalysis" element={<FoodAnalysis/>}/>
          <Route path="/Resources/ChatBot" element={<ChatBot/>}/>
        </Routes>
      <FooterComponent />
      </BrowserRouter>
    </div>
  )
}
