import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "@/components/CustomTextInput";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { supabaseClient } from "@/config/supabase-client";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Update the password using the Supabase client
    const { error: updateError } = await supabaseClient.auth.updateUser({
      password: password,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      navigate("/login", {
        state: {
          message: "Password reset successful!",
        },
      });
    }
  };

  useEffect(() => {
    const handleSessionFromURL = async () => {
      // Extract session-related parameters from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("access_token");
      const refreshToken = urlParams.get("refresh_token");

      if (accessToken && refreshToken) {
        // Set the session in Supabase
        const { error } = await supabaseClient.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          setError("Failed to restore session. Please try again.");
        }
      }
    };

    handleSessionFromURL();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-4xl text-primary mb-6">Reset Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="flex flex-col relative">
            <CustomTextInput
              label="New Password"
              name="NewPassword"
              placeholder="e.g., @ReallySecure07"
              type={showNewPassword ? "text" : "password"}
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
              icon={showNewPassword ? faEyeSlash : faEye}
              className="text-white absolute right-3 bottom-4 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          </div>

          <div className="flex flex-col relative">
            <CustomTextInput
              label="Confirm New Password"
              name="confirm password"
              type={showConfirmPassword ? "text" : "password"}
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
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="text-white absolute right-3 bottom-4 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Reset Password
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
