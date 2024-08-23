// src/pages/ProfileEditPage.tsx
import React from "react";
import ProfileEditForm from "@/components/ProfileEditForm";

const ProfileEditPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
        <ProfileEditForm />
      </div>
    </div>
  );
};

export default ProfileEditPage;
