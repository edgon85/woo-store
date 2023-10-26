import { useState } from 'react';
import { useAuth } from './useAuth';
import { wooApi } from '@/wooApi';

interface CreateDataResponse<T> {
  message: string;
  data: T | null;
}

export const useCreateData = <T>() => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createData = async (
    url: string,
    data: T
  ): Promise<CreateDataResponse<T>> => {
    try {
      setLoading(true);
      const response = await wooApi.post(
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

  return { createData, loading, error };
};
