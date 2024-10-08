import { SWRConfiguration } from 'swr';
import useSWR from 'swr';

export const useFetcher = <T>(url: string, config: SWRConfiguration = {}) => {
  const localApiUrl = `/api/${url.startsWith('/') ? url.slice(1) : url}`;

  const { data, error } = useSWR<T>(localApiUrl, config);

  return {
    data: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
