import React, { HTMLAttributes } from "react";
import { useAuth } from "@/hooks/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  showPenOnHover?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  onClick,
  showPenOnHover = false,
  ...props
}) => {
  const { user } = useAuth();
  const username = user?.user_metadata?.username;
  const avatarUrl = `https://robohash.org/${username}.png?set=set4`;

  return (
    <div
      className={`relative w-full h-full ${showPenOnHover ? "group cursor-pointer" : ""}`}
      onClick={onClick}
      {...props}
    >
      <img
        src={avatarUrl}
        alt="User Avatar"
        className="w-full h-full rounded-full"
      />
      {showPenOnHover && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FontAwesomeIcon icon={faPen} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
