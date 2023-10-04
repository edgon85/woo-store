export interface IUser {
  id: string;
  email: string;
  fullName: string;
  token: string;
  password?: string;
  role: string[];
  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface IProfile {
  id: string;
  biography?: string;
  profileImage?: string;
  location?: string;
  gender: string;
  phone?: string;
}
