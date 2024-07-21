import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/Auth";
import CustomTextInput from "@/components/CustomTextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/NewLogo.png";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import TheBird from "../assets/TheBird.png";
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

    if (action === "Sign Up" && username == "") {
      setError("Please enter a username");
      return;
    }

    if (action === "Sign Up" && username != "") {
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
      {/* Left part with TheBird */}
      <div className="relative w-1/2 flex items-end">
        <img
          src={TheBird}
          alt="TheBird"
          className="absolute bottom right-36 h-full w-full object-contain"
        />
      </div>

      {/* Right part with logo and login form */}
      <div className="relative w-1/2 flex justify-center items-center m-0">
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
                placeholder="Username"
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
              placeholder="Email"
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
                placeholder="Password"
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

          {action === "Sign Up" ? null : (
            <div className="text-right text-sm text-gray-400 mb-3">
              <span className="text-white font-bold cursor-pointer transition-colors hover:text-gray-300">
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
