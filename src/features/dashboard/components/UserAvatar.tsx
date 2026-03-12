import Image from "next/image";
import { IUserAvatarProps } from "../types";

export function UserAvatar({ src, name, size = 96 }: IUserAvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (!src) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold"
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name}'s avatar`}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}
