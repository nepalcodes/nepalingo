import React, { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/Auth";
import CustomTextInput from "@/components/CustomTextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import BhasaAnimation from "@/components/AnimatedBhasaWithLottie";
import ReactGA from "react-ga4";
import Button from "@/components/Button";

const SignUp: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "login",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, session } = useAuth();

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    const { error } = await signUp({
      options: { data: { username: formData.get("username") as string } },
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  if (session) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="flex max-lg:flex-col max-md:items-center h-[100svh]  text-white">
      <div className="relative w-1/2 max-md:w-[80svw] h-auto max-lg:mx-auto max-lg:flex-1  flex items-center justify-center overflow-clip">
        <div className="relative items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-0 w-full h-full "
          >
            <path
              fill="#FFD6E8"
              d="M52.9,-53.1C66.5,-39.4,74,-19.7,70.6,-3.4C67.2,12.9,52.9,25.7,39.3,36.9C25.7,48.1,12.9,57.5,-3.2,60.7C-19.2,63.9,-38.3,60.7,-51.7,49.5C-65,38.3,-72.5,19.2,-68.5,4.1C-64.4,-11,-48.8,-22.1,-35.4,-35.8C-22.1,-49.5,-11,-65.9,4.3,-70.2C19.7,-74.5,39.4,-66.8,52.9,-53.1Z"
              transform="translate(102 117) scale(1.36)"
            />
          </svg>
          <div style={{ transform: "scaleX(-1)" }}>
            <BhasaAnimation />
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 max-md:flex-none max-md:w-full  justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className="container flex-col w-96  max-lg:w-full  p-2"
        >
          {/* Header */}
          <div className="flex flex-col mb-6">
            <div className="text-4xl font-bold text-primary uppercase">
              Sign up
            </div>
          </div>

          {/* Input fields */}
          <div className="flex flex-1  flex-col gap-3 mb-2">
            <CustomTextInput
              label="Username"
              name="username"
              required
              autoComplete="name"
              placeholder="eg: bird24"
              iconProps={{
                icon: faUser,
                className: "text-white ",
              }}
            />
            <CustomTextInput
              label="Email"
              name="email"
              autoComplete="username"
              required
              placeholder="eg: bird24@bigbirds.com"
              iconProps={{
                icon: faEnvelope,
                className: "text-white ",
              }}
            />
            <div className="relative">
              <CustomTextInput
                label="Password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="eg: @ReallySecure07"
                type={showPassword ? "text" : "password"}
                iconProps={{
                  icon: faLock,
                  className: "text-white",
                }}
                containerStyle="h-12"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-white absolute right-3 bottom-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          {success && (
            <p className="text-green-500 mt-4">
              Sign up successful! Please check your email to confirm.
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-1 w-full mt-5">
            <Button
              type="submit"
              className="bg-primary block w-full text-white font-bold py-2 px-6 rounded  text-md"
            >
              SignUp
            </Button>
          </div>
          <p className="text-sm text-grayLight mt-2 text-center font-secondary cursor-pointer transition-colors hover:text-gray-300">
            <Link to="/login">
              Already have an account?{" "}
              <span className="text-primary underline">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
