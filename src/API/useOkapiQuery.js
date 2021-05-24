import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

export const useOkapiQuery = ({ path, searchParams, ...rest }) => {
  const ky = useOkapiKy();
  const queryKey = [path, searchParams];
  const queryFn = () => ky(path, { searchParams }).json();

  return useQuery({ queryKey, queryFn, ...rest });
};
