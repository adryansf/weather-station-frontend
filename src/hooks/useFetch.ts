import useSWR, { SWRConfiguration } from 'swr';
import api from '../services/api';

export function useFecth<Data = any, Error = any>(
  url: string,
  options: SWRConfiguration = {}
) {
  const { data, error, mutate, isLoading } = useSWR<Data, Error>(
    url,
    async url => {
      const response = await api.get(url);

      return response.data;
    },
    options
  );

  return { data, error, mutate, isLoading };
}
