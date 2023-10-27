import { useState } from 'react';
import { useAuth } from './useAuth';
import { wooApi } from '@/wooApi';

interface UpdateDataResponse<T> {
  message: string;
  data: T | null;
}

export const useUpdateData = <T>() => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (
    url: string,
    data: T
  ): Promise<UpdateDataResponse<T>> => {
    try {
      setLoading(true);

      const response = await wooApi.patch(
        url,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      return {
        message: 'ok',
        data: response.data,
      };
    } catch (error: any) {
      setError(error.response?.data?.message || 'An unexpected error occurred');
      return {
        message:
          error.response?.data?.message || 'An unexpected error occurred',
        data: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error };
};
