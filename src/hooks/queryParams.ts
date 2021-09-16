import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';

interface QueryConfig {
  clearQuery?: boolean;
  enforceLowers?: boolean;
}

interface QueryParams {
  [key: string]: string[];
}

export function useQueryParams({
  clearQuery = true,
  enforceLowers,
}: QueryConfig = {}): QueryParams {
  const { search } = useLocation();
  const { replace } = useHistory();

  const [queryParams] = useState(() => {
    const searchParams = new URLSearchParams(search);

    const searchAsArray = Array.from(searchParams.entries());

    const params = searchAsArray.reduce((accParams, keyValuePair) => {
      const [key, value] = keyValuePair.map((x) => (enforceLowers ? x.toLocaleLowerCase() : x));

      const existingKeyValue = accParams[key] || [];

      const updatedValue = [...existingKeyValue, value];

      const updatedAccumulator = { ...accParams, [key]: updatedValue };

      return updatedAccumulator;
    }, {} as QueryParams);

    return params;
  });

  useEffect(() => {
    if (clearQuery) replace({ search: '' });
  }, []); // eslint-disable-line

  return queryParams;
}
