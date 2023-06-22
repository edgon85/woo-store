export interface IUser {
  id: string;
  email: string;
  fullName: string;
  token: string;
  password?: string;
  role: string[];

  createdAt?: string;
  updatedAt?: string;
}
