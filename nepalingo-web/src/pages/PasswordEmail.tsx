import React, { useState } from "react";
import { useAuth } from "@/hooks/Auth";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import CustomTextInput from "@/components/CustomTextInput";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const PasswordEmail: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPasswordEmail } = useAuth();
  const navigate = useNavigate();

  const handlePasswordEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    resetPasswordEmail(email).then(({ error }) => {
      if (error) {
        setError(error.message);
        setMessage("");
      } else {
        setMessage("Password reset email sent! Check your inbox");
        setError("");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-4xl text-secondary text-primary mb-6">
          Reset Password
        </h2>
        <form onSubmit={handlePasswordEmail} className="space-y-4 ">
          <CustomTextInput
            label="Email"
            name="email"
            placeholder="eg., bird24@bigbirds.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconProps={{
              icon: faEnvelope,
              className:
                "text-black absolute left-3 top-1/2 transform -translate-y-1/2",
            }}
            containerStyle="h-12"
          />
          <Button
            type="submit"
            className="ml-0 text-lg text-gray-600 cursor-pointer w-50"
          >
            Send Reset Link
          </Button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && (
          <div className="mt-4 text-red-500">
            {error}{" "}
            <button
              className="underline text-white"
              onClick={() => navigate("/login")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordEmail;
