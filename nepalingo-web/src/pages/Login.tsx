import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/Auth";
import CustomTextInput from "@/components/CustomTextInput";
import logo from "@/assets/NewLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import BhasaAnimation from "@/components/AnimatedBhasaWithLottie";
import ReactGA from "react-ga4";

const Login: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "login",
  });

  const [action, setAction] = useState<"Sign Up" | "Log In">("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, signIn, session } = useAuth();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (action === "Sign Up" && username === "") {
      setError("Please enter a username");
      return;
    }

    if (action === "Sign Up" && username !== "") {
      const { error } = await signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } else {
      const { error } = await signIn({
        email,
        password,
      });

      if (error) {
        // If there is an error during log in, set the error message
        setError(error.message);
      } else {
        navigate("/");
      }
    }
  };

  // Function to handle changing between Sign Up and Log In actions
  const handleActionChange = (newAction: "Sign Up" | "Log In") => {
    setAction(newAction);
    setError(null);
    setSuccess(false);
    setEmail(""); // the email and password field will reset everytime action is changed
    setPassword("");
  };

  if (session) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="relative w-1/2 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-0 w-full h-full"
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

      {/* Right part with logo and login form */}
      <div className="relative w-1/2 flex justify-center items-center">
        <img
          src={logo}
          alt="Nepalingo Logo"
          className="absolute top-4 w-80 h-24 object-contain"
        />
        <div className="container absolute top-40 flex-col w-96 bg-black p-2">
          {/* Header */}
          <div className="flex flex-col mb-6">
            <div className="text-4xl font-bold text-primary">{action}</div>
          </div>

          {/* Input fields */}
          <div className="flex flex-col gap-3 mb-8">
            {action !== "Log In" && (
              <CustomTextInput
                label="Username"
                name="username"
                placeholder="eg., The Bird"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                iconProps={{
                  icon: faUser,
                  className:
                    "text-white absolute left-3 top-1/2 transform -translate-y-1/2",
                }}
                containerStyle="h-12"
              />
            )}

            <CustomTextInput
              label="Email"
              name="email"
              placeholder="eg., bird24@bigbirds.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              iconProps={{
                icon: faEnvelope,
                className:
                  "text-white absolute left-3 top-1/2 transform -translate-y-1/2",
              }}
              containerStyle="h-12"
            />

            <div className="relative">
              <CustomTextInput
                label="Password"
                name="password"
                placeholder="eg., @ReallySecure07"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconProps={{
                  icon: faLock,
                  className:
                    "text-white absolute left-3 top-1/2 transform -translate-y-1/2",
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

          {/* Forgot Password link */}
          {action === "Sign Up" ? null : (
            <div className="text-right text-sm text-gray-400 mb-3">
              <span
                className="text-white font-bold cursor-pointer transition-colors hover:text-gray-300"
                onClick={() => navigate("/reset-password-email")}
              >
                Forgot Password?
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between gap-1 ">
            <div
              className={`flex justify-center items-center w-44 h-12 rounded-lg text-white cursor-pointer transition-colors duration-300 ${
                action === "Log In" ? "bg-[#2B2B2B]" : "bg-[#D03641]"
              }`}
              onClick={() => {
                if (action === "Sign Up") handleSubmit();
                else handleActionChange("Sign Up");
              }}
            >
              Sign Up
            </div>
            <div
              className={`flex justify-center items-center w-44 h-12 rounded-lg text-white cursor-pointer transition-colors duration-300 ${
                action === "Sign Up" ? "bg-[#2B2B2B]" : "bg-[#D03641]"
              }`}
              onClick={() => {
                if (action === "Log In") handleSubmit();
                else handleActionChange("Log In");
              }}
            >
              Log In
            </div>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && action === "Sign Up" && (
            <p className="text-green-500 mt-4">
              Sign up successful! Please check your email to confirm.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
