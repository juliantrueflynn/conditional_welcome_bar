import { useState, useEffect } from 'react';
import { apiFetch } from '../util/apiUtil';

export const useLoadViewData = ({ apiPath, initialDataState }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialDataState);

  useEffect(() => {
    apiFetch(apiPath).then((json) => {
      setIsLoading(false);
      setData(json);
    });
  }, [apiPath]);

  return { data, isLoading };
};
