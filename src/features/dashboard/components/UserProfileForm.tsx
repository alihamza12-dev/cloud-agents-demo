"use client";

import { useState } from "react";
import { IUserProfileFormProps } from "../types";

export function UserProfileForm({ displayName, onSave }: IUserProfileFormProps) {
  const [value, setValue] = useState(displayName);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasChanges = value.trim() !== displayName;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasChanges || !value.trim()) return;

    setIsSaving(true);
    setSaved(false);
    onSave(value.trim());
    setIsSaving(false);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="displayName" className="text-sm font-medium text-gray-700">
        Display Name
      </label>
      <input
        id="displayName"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Enter your display name"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!hasChanges || !value.trim() || isSaving}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        {saved && (
          <span className="text-sm text-green-600">Display name updated.</span>
        )}
      </div>
    </form>
  );
}
