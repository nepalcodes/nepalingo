import React from "react";
import { useAuth } from "./userAuth/AuthContext"; // Adjust the import path based on your project structure

const UserAvatar: React.FC = () => {
  const { user } = useAuth();
  const username = user?.user_metadata?.username;
  const avatarUrl = `https://robohash.org/${username}.png`;

  return (
    <img
      src={avatarUrl}
      alt="User Avatar"
      className="w-full h-full rounded-full"
    />
  );
};

export default UserAvatar;
