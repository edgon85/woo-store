import { IProfile } from '@/interfaces';
import { wooApi } from '@/wooApi';

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
export const updateProfile = async (token: string, profile: IProfile) => {
  try {
    const { id, ...toUpdate } = profile;
    const { data } = await wooApi.patch(
      `profiles/${id}`,
      { ...toUpdate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const updatePhotoProfile = async (
  profileId: string,
  token: string,
  photoUrl: string
) => {
  try {
    const { data } = await wooApi.patch(
      `profiles/${profileId}`,
      { profileImage: photoUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
