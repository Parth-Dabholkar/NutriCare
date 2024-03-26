import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react"
import { GoSignIn } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInFailure, signInStart } from "../redux/user/userSlice.js";


export default function SignIn() {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const {loading, error : errorMessage} = useSelector(state => state.user)
  const navigate = useNavigate()

  const handleChange = (e) => {
    // console.log(e.target.value) : Gives the changes made in the input
    setFormData({...formData, [e.target.id] : e.target.value.trim() })
  }
  //console.log(formData)

  const handleSubmit = async (e) => {
      e.preventDefault()
      if(!formData.email || !formData.password)
      {
        return dispatch(signInFailure('Please fill out all the fields!!'))
      }
      try{
        dispatch(signInStart())
        const res = await fetch('/api/serverSide/signin', {
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify(formData)
        })
        const data = await res.json()
        if(data.success === false)
        {
          dispatch(signInFailure(data.message))
        }
        if(res.ok)
        {
          dispatch(signInSuccess(data))
          navigate('/')
        }
      }
      catch(error)
      {
        dispatch(signInFailure(error.message))
      }
  }
  return (
    <>
      <div className="min-h-screen">
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
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <Label value="Your Email"/>
                    <TextInput type="email" placeholder="Email" id="email" onChange={handleChange}/>
                </div>
                <div>
                    <Label value="Password"/>
                    <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
                </div>
                    <Button gradientDuoTone="greenToBlue" type="submit" disabled={loading}>{
                      loading ? (
                        <>
                          <Spinner size='sm'/>
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : <>SignIn<GoSignIn className=" ml-2 h-5 w-5" /></>
                    }</Button>
                    <Button gradientDuoTone="pinkToOrange" outline ><AiFillGoogleCircle className="mr-2 h-5 w-5"/>Sign-In with Google</Button>
                    <div className="flex gap-2">
                        <span>Don't have an account?</span>
                        <Link className=" text-blue-500" to="/Signup">Sign-Up</Link>
                    </div>
            </form>
            {
              errorMessage && (
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
