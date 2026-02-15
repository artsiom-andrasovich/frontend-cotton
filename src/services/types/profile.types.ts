export type TProfile = {
  username: string;
  email?: string | null;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  createdAt: string;
};

export type TUpdateProfileForm = {
  firstName?: string;
  lastName?: string;
};
