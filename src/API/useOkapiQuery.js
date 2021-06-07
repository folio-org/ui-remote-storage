import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

const DEFAULT = {
  PARAMS: {
    limit: 1000,
  },
  OPTIONS: {
    staleTime: 1000 * 60 * 30,
  },
};

export const useOkapiQuery = ({ path, params, ...rest }) => {
  const ky = useOkapiKy();
  const searchParams = { ...DEFAULT.PARAMS, ...params };
  const queryKey = [path, searchParams];
  const queryFn = () => ky(path, { searchParams }).json();

  return useQuery({ queryKey, queryFn, ...DEFAULT.OPTIONS, ...rest });
};
