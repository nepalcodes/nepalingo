// src/pages/ProfilePage.tsx
import React from "react";
import UserAvatar from "@/components/UserAvatar"; // Adjust the import path if needed
import { AuthProvider } from "@/hooks/Auth";
import ProfileEditForm from "@/components/ProfileEditForm"; // Adjust the import path if needed

const ProfilePage: React.FC = () => {
  return (
    <AuthProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <div className="flex items-center space-x-4">
          <UserAvatar />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Profile Details</h2>
            {/* Other user details can be displayed here */}
          </div>
        </div>
        {/* ProfileEditForm can be included here if needed */}
      </div>
    </AuthProvider>
  );
};

export default ProfilePage;
