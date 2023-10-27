export interface IUser {
  id: string;
  email: string;
  fullName: string;
  token: string;
  password?: string;
  username: string;
  profileImage: string;
  role: string[];
  isActive: boolean;

  location?: string;
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

export interface IAddress {
  id?: string;
  fullName: string;
  fullAddress: string;
  city: string;
  country: string;
  phone: string;
  label: string;
  isPrimary?: boolean;
  user?: IUser;
}

export type LocalDataUser = {
  id: string;
  token: string;
  email: string;
  fullName: string;
  username: string;
  authType: string;
};
