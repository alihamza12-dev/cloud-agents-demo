"use client";

import { IUserProfileProps } from "../types";
import { UserAvatar } from "./UserAvatar";
import { UserProfileForm } from "./UserProfileForm";

export function UserProfile({ user, onUpdateDisplayName }: IUserProfileProps) {
  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <UserAvatar src={user.avatarUrl} name={user.name} size={96} />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      <UserProfileForm
        displayName={user.displayName}
        onSave={onUpdateDisplayName}
      />
    </div>
  );
}
