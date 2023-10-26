import { useEffect, useState } from 'react';

import { wooApi } from '@/wooApi';
import { useAuth } from './useAuth';

export const useLoadingData = (url: string, token?: string) => {
  const { user } = useAuth();

  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user?.token) {
      return;
    }
    fetchData(url, user.token!);
  }, [url, user]);

  const fetchData = async (url: string, token: string) => {
    try {
      const headers: Record<string, string> = {};

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const { data } = await wooApi.get(url, { headers });
      setData(data);
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    errorMessage,
  };
};
