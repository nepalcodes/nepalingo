import React, { useState } from "react";
import { useAuth } from "@/hooks/Auth";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "@/components/CustomTextInput";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handlePasswordReset = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    resetPassword(password).then(({ error }) => {
      if (error) {
        setError(error.message);
        setMessage("");
      } else {
        setMessage("Password reset successful! Go to ");
        setError("");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-4xl text-primary mb-6">Reset Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="flex flex-col">
            <CustomTextInput
              label="New Password"
              name="NewPassword"
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
          <div className="flex flex-col">
            <CustomTextInput
              label="Confirm New Password"
              name="confirm password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Reset Password
          </Button>
        </form>
        {message && (
          <div className="mt-4 text-green-500">
            {message}{" "}
            <button
              onClick={() => navigate("/login")}
              className="underline text-white"
            >
              Login
            </button>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
