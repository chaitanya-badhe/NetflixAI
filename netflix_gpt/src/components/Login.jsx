import { useState,useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";


const Login = () => {
  const [isSignInForm ,setIsSignInForm] =useState(true);
  const [errorMessage , setErrorMessage] = useState(null);

  const email =  useRef(null);
  const password = useRef(null);

  const toggleSignInForm =()=>{
    setIsSignInForm(!isSignInForm);
  }


  const handleButtonClick =() =>{
    // validation of  form data
    console.log(email.current.value);
    console.log(password.current.value);

    const message = checkValidData(email.current.value , password.current.value);
    setErrorMessage(message);
  };

  return (  
    <div>
      <Header/> 
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cafd79d7-3d44-4558-8d0a-fc447fc3899f/web/IN-en-20261116-TRIFECTA-perspective_fb18c287-82ef-4e94-9068-ee48f50d0f53_large.jpg"
        />
      </div>
        <form onSubmit={(e)=>e.preventDefault()} className="absolute w-3/12 p-12 bg-black/80 my-36 mx-auto right-0 left-0  rounded-lg ">
          <h1 className="font-bold text-2xl py-4 text-white">{isSignInForm? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && (
            < input
              type="text"
              placeholder="Full Name"
              className="p-4 my-2 bg-gray-700 text-white placeholder-gray-300 w-full "
            />
          )}
          <input ref={email} type="text" placeholder="Email Address"  className="p-4 my-2 bg-gray-700 text-white placeholder-gray-300 w-full"/>
          <input ref={password} type="password" placeholder="password"  className="p-4 my-2 bg-gray-700 text-white placeholder-gray-300 w-full" />

          <p className="text-red-500">{errorMessage}</p>

          <button onClick={handleButtonClick} className="p-4 my-4 text-white bg-red-600 w-full">{isSignInForm ? "Sign In" : "Sign Up"}</button>

          <p onClick={toggleSignInForm} className="py-4 text-white cursor-pointer">
            {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
          </p>
        </form>
    </div>
  )
}

export default Login;

