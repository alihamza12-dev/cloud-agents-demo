"use client";

import { useState } from "react";
import { UserProfile } from "@/features/dashboard";
import { IUserProfile } from "@/features/dashboard";

const initialUser: IUserProfile = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  displayName: "Jane",
  avatarUrl: "",
};

export default function ProfilePage() {
  const [user, setUser] = useState<IUserProfile>(initialUser);

  function handleUpdateDisplayName(displayName: string) {
    setUser((prev) => ({ ...prev, displayName }));
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 font-[family-name:var(--font-geist-sans)]">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">User Profile</h1>
        <UserProfile user={user} onUpdateDisplayName={handleUpdateDisplayName} />
      </div>
    </div>
  );
}
