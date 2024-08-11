import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "@/config/supabase-client";
import { useAuth} from "@/hooks/Auth";
import CustomTextInput from "./CustomTextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen, faCamera } from "@fortawesome/free-solid-svg-icons";

const ProfileEditForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, refetchUser } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(
    user?.user_metadata.avatar_url || ""
  );
  const [username, setUsername] = useState(user?.user_metadata.username || "");
  const [status, setStatus] = useState(user?.user_metadata.status || "");
  const [isDragging, setIsDragging] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const filePath = `public/${file.name}`;

      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabaseClient.storage
        .from('Avatars') 
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError.message);
        return;
      }

      // Construct the URL of the uploaded file
      const uploadedAvatarUrl = `https://your-supabase-instance.supabase.co/storage/v1/object/public/avatars/${file.name}`;
      setAvatarUrl(uploadedAvatarUrl);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const filePath = `public/${file.name}`;

      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabaseClient.storage
        .from('Avatars') 
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError.message);
        return;
      }

      // Construct the URL of the uploaded file
      const uploadedAvatarUrl = `https://your-supabase-instance.supabase.co/storage/v1/object/public/avatars/${file.name}`;
      setAvatarUrl(uploadedAvatarUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleSaveChanges = async () => {
    if (!user) return;

    // Update user metadata in Supabase
    const { error } = await supabaseClient.auth.updateUser({
      data: {
        username, // Update username directly in Supabase
        avatar_url: avatarUrl,
        status,
      },
    });

  
    // Refetch user data to update UI
    await refetchUser();

    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div
        className={`relative w-40 h-40 rounded-full overflow-hidden group cursor-pointer ${isDragging ? "border-4 border-dashed border-white" : "border-2 border-gray-600"}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <img
          src={avatarUrl || "/default-avatar.png"}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FontAwesomeIcon icon={faCamera} className="text-white text-xl" />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <div className="mt-8 w-3/4 max-w-xl">
        <CustomTextInput
          label="Username"
          name="username"
          required
          autoComplete="name"
          placeholder="eg: bird24"
          iconProps={{
            icon: faUser,
            className: "text-white",
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <CustomTextInput
          label="Status"
          name="status"
          required
          autoComplete="status"
          placeholder="Enter your status"
          iconProps={{
            icon: faPen,
            className: "text-white",
          }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button
          onClick={handleSaveChanges}
          className="w-full mt-6 bg-primary text-white p-3 rounded-lg hover:bg-secondary transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
export default ProfileEditForm;
