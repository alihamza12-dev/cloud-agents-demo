export interface IUserProfile {
  name: string;
  email: string;
  displayName: string;
  avatarUrl: string;
}

export interface IUserAvatarProps {
  src: string;
  name: string;
  size?: number;
}

export interface IUserProfileFormProps {
  displayName: string;
  onSave: (displayName: string) => void;
}

export interface IUserProfileProps {
  user: IUserProfile;
  onUpdateDisplayName: (displayName: string) => void;
}
