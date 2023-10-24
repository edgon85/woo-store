import { wooApi } from '@/wooApi';
import { useEffect, useState } from 'react';

export const useLoadingData = (url: string, token?: string) => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData(url, token!);
  }, [url, token]);

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
