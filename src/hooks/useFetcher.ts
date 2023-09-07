import { SWRConfiguration } from 'swr';
import useSWR from 'swr';

export const useFetcher = (url: string, config: SWRConfiguration = {}) => {
  const urlED = `${process.env.API_BASE_URL}${url}`;
  const { data, error } = useSWR(urlED, config);

  return {
    data: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
