import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface UseFetchArgs {
  url: string;
  customAxiosInstance?: AxiosInstance;
  showLoading?: boolean;
  config?: AxiosRequestConfig;
  customErrorParser?: (err: AxiosError) => void;
}

interface UseFetch<Entity> {
  loading: boolean;
  error: boolean;
  data: Entity | null;
  retry: () => void;
}

const ZERO = 0;
const RETRY_INCREMENT = 1;

export function useFetch<Entity>({
  customAxiosInstance,
  url,
  config,
  showLoading = true,
  customErrorParser,
}: UseFetchArgs): UseFetch<Entity> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Entity | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(ZERO);

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        if (showLoading) setLoading(true);

        const instance = customAxiosInstance || axios;

        const { data: loaded } = await instance.get<Entity>(url, config);

        setData(loaded);
      } catch (err) {
        setError(true);

        customErrorParser?.(err as AxiosError);
      } finally {
        if (showLoading) setLoading(false);
      }
    }

    load();
  }, [retryAttempts]); // eslint-disable-line react-hooks/exhaustive-deps

  const retry = useCallback(() => {
    setRetryAttempts((old) => old + RETRY_INCREMENT);
  }, []);

  return {
    loading,
    error,
    data,
    retry,
  };
}
