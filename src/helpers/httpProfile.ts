import { IProfile, IUser } from '@/interfaces';
import { wooApi } from '@/wooApi';
import Cookies from 'js-cookie';

export const getUserProfile = async (userId?: string, token?: string) => {
  try {
    const { data } = await wooApi.get<IProfile>(`/profiles/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

/* ······································································· */

export const getUserPublicProfile = async (username: string) => {
  try {
    const { data } = await wooApi.get(`/profiles?u=${username}`);

    return {
      message: 'ok',
      data,
    };
  } catch (error: any) {
    return {
      message: error.response.data.message,
      data: null,
    };
  }
};

/* ······································································· */

type DataUser = {
  password?: string;
  fullName?: string;
  username?: string;
  email?: string;
};

export const updateUserData = async (userId: string, dataUser: DataUser) => {
  const token = Cookies.get('token');
  try {
    const { data } = await wooApi.patch(
      `/auth/update/${userId}`,
      { ...dataUser },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // return data;
    return {
      message: 'ok',
      data,
    };
  } catch (error: any) {
    // return error.response.data.message;
    return {
      message: error.response.data.message,
      data: null,
    };
  }
};
