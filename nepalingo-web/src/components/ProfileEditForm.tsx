import React, { useState } from "react";
import { supabaseClient } from "@/config/supabase-client";
import { useAuth } from "@/hooks/Auth";

const ProfileEditForm: React.FC = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata.avatar_url || "");
  const [username, setUsername] = useState(user?.user_metadata.username || "");
  const [bio, setBio] = useState(user?.user_metadata.bio || "");
  const [status, setStatus] = useState(user?.user_metadata.status || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!user) return;

    // Update user metadata
    const { data, error } = await supabaseClient.auth.updateUser({
      data: {
        avatar_url: avatarUrl,
        username,
        bio,
        status,
      },
      password: password || undefined, // Optional password update
    });

    if (error) {
      console.error("Error updating profile:", error.message);
      return;
    }

    console.log("Profile updated successfully");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div>
        <label>Avatar URL</label>
        <input
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label>Status</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Save Changes
      </button>
    </div>
  );
};

export default ProfileEditForm;
