import React from "react";
import { useAuth } from "@/hooks/Auth";

const UserAvatar: React.FC = () => {
  const { user } = useAuth();
  const username = user?.user_metadata?.username;
  const avatarUrl = `https://robohash.org/${username}.png?set=set4`;

  return (
    <img
      src={avatarUrl}
      alt="User Avatar"
      className="w-full h-full rounded-full"
    />
  );
};

export default UserAvatar;
