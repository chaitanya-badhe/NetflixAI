import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm((currentValue) => !currentValue);
    setErrorMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value;
    const fullNameValue = fullName.current?.value.trim();
    const message = checkValidData(emailValue, passwordValue, !isSignInForm);

    if (message) {
      setErrorMessage(message);
      return;
    }

    if (!isSignInForm && !fullNameValue) {
      setErrorMessage("Enter your full name.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (isSignInForm) {
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      } else {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
        await updateProfile(user, { displayName: fullNameValue });
      }

      navigate("/browse", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cafd79d7-3d44-4558-8d0a-fc447fc3899f/web/IN-en-20261116-TRIFECTA-perspective_fb18c287-82ef-4e94-9068-ee48f50d0f53_large.jpg"
          alt=""
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="absolute w-3/12 p-12 bg-black/80 my-36 mx-auto right-0 left-0 rounded-lg"
      >
        <h1 className="font-bold text-2xl py-4 text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullName}
            type="text"
            autoComplete="name"
            placeholder="Full Name"
            className="p-4 my-2 bg-gray-700 text-white placeholder-gray-300 w-full"
          />
        )}
        <input
          ref={email}
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          className="p-4 my-2 bg-gray-700 text-white placeholder-gray-300 w-full"
        />
        <input
          ref={password}
          type="password"
          autoComplete={isSignInForm ? "current-password" : "new-password"}
          placeholder="Password"
          className="p-4 my-2 bg-gray-700 text-white placeholder-gray-300 w-full"
        />

        {errorMessage && (
          <p role="alert" className="text-red-500">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="p-4 my-4 text-white bg-red-600 w-full disabled:opacity-60"
        >
          {isSubmitting
            ? "Please wait..."
            : isSignInForm
              ? "Sign In"
              : "Sign Up"}
        </button>

        <p onClick={toggleSignInForm} className="py-4 text-white cursor-pointer">
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
