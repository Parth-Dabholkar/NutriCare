import { Label, TextInput, Button } from "flowbite-react"
import { GoSignIn } from "react-icons/go";
import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function Signup() {
  return (
    <div className=" m-8 mt-40 max-w-6xl flex mx-auto p-4  xl:rounded-xl xl:shadow-2xl">
        {/* Left */}
      <div className=" hidden md:block flex-1">
        <div className=" flex flex-col items-center mb-5 gap-3 mt-36">
            <Link to="/" className='self-center whitespace-nowrap text-8xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>Nutri</span>Care
            </Link>
            <p className=" mt-4 text-xl">Your perfect companion for Nutrition Analysis.</p>
        </div>
      </div>
      {/* Left */}
      <div className=" flex-1 m-3">
        <div className=" flex flex-col justify-center items-center mb-5 gap-3 md:hidden">
            <Link to="/" className='self-center whitespace-nowrap text-6xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>Nutri</span>Care
            </Link>
            <p className=" mt-2">Your perfect companion for Nutrition Analysis.</p>
        </div>
        <form className="flex flex-col gap-4">
            <div>
                <Label value="Your Username"/>
                <TextInput type="text" placeholder="Username" id="username"/>
            </div>
            <div>
                <Label value="Your Email"/>
                <TextInput type="email" placeholder="Email" id="email"/>
            </div>
            <div>
                <Label value="Password"/>
                <TextInput type="password" placeholder="Password" id="password"/>
            </div>
                <Button gradientDuoTone="greenToBlue">SignUp<GoSignIn className=" ml-2 h-5 w-5" /></Button>
                <Button gradientDuoTone="pinkToOrange" outline><AiFillGoogleCircle className="mr-2 h-5 w-5"/>Sign-In with Google</Button>
                <div className="flex gap-2">
                    <span>Have an account?</span>
                    <Link className=" text-blue-500" to="/SignIn">Sign-In</Link>
                </div>
        </form>
      </div>
    </div>
  )
}
