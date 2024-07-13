import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ReactGA from 'react-ga4';

const User_auth: React.FC = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "login"});
  const [action, setAction] = useState<"Sign Up" | "Log In">("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, signIn } = useAuth();
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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container flex flex-col mx-auto w-96 bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl font-bold text-black-600">{action}</div>
          <div className="w-12 h-1 bg-black-600 rounded-full mt-2"></div>
        </div>

        {/* Input fields */}
        <div className="flex flex-col gap-5 mb-5">
          {action === "Log In" ? null : (
            <div className="flex items-center w-full h-12 bg-gray-200 rounded-md px-3">
              <FontAwesomeIcon icon={faUser} className="text-black-600" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 p-2"
              />
            </div>
          )}

          <div className="flex items-center w-full h-12 bg-gray-200 rounded-md px-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-black-600" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 p-2"
            />
          </div>

          <div className="flex items-center w-full h-12 bg-gray-200 rounded-md px-3">
            <FontAwesomeIcon icon={faLock} className="text-black-600" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 p-2"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-black-600 cursor-pointer ml-2"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {action === "Sign Up" ? null : (
          <div className="text-right text-sm text-gray-500 mb-7">
            <span className="text-black font-bold cursor-pointer transition-colors hover:text-gray-700">
              Forgot Password?
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-between gap-1">
          <div
            className={`flex justify-center items-center w-36 h-12 rounded-full text-white cursor-pointer transition-colors duration-300 ${
              action === "Log In"
                ? "bg-gray-300 text-gray-700"
                : "bg-black hover:bg-gray-800"
            }`}
            onClick={() => {
              if (action === "Sign Up") handleSubmit();
              else handleActionChange("Sign Up");
            }}
          >
            Sign Up
          </div>
          <div
            className={`flex justify-center items-center w-36 h-12 rounded-full text-white cursor-pointer transition-colors duration-300 ${
              action === "Sign Up"
                ? "bg-gray-300 text-gray-700"
                : "bg-black hover:bg-gray-800"
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
  );
};

export default User_auth;
