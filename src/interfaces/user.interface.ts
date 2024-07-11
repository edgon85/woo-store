export interface IUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  profileImage: string;
  token: string;
  password?: string;
  profile?: IProfile;
  authType: string;
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
