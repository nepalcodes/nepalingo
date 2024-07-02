import React, { useState } from "react";
import "./User_auth.css";
import supabase from "./supabaseClient";
//import { useNavigate } from "react-router-dom";

const User_auth: React.FC = () => {
  const [action, setAction] = useState<"Sign Up" | "Log In">("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  //const navigate = useNavigate();

  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  //   const handleCaptchaChange = (token: string | null) => {
  //     setCaptchaToken(token);
  // };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    // if (!captchaToken) {
    //   setError('Please complete the CAPTCHA');
    //   return;

    if (action === "Sign Up") {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        //navigate("./Header.tsx");
        console.log("Logged in");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Log In" ? (
          <div></div>
        ) : (
          <div className="input">
            <i className="fas fa-user icon"></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <i className="fas fa-envelope icon"></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <i className="fas fa-lock icon"></i>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} icon`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          ></i>
        </div>
      </div>

      {action === "Log In" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          <span>Forgot Password? </span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Log In" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
            handleSubmit();
          }}
        >
          Sign Up
        </div>

        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Log In");
            handleSubmit();
          }}
        >
          Log In
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && action === "Sign Up" && (
        <p style={{ color: "green" }}>
          Sign up successful! Please check your email to confirm.
        </p>
      )}
    </div>
  );
};

export default User_auth;
