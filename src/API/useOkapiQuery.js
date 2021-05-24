import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

export const useOkapiQuery = ({ path, searchParams, ...options }) => {
  const ky = useOkapiKy();
  const queryKey = [path, searchParams];
  const queryFn = () => ky(path, { searchParams }).json();

  return useQuery(queryKey, queryFn, options);
};
