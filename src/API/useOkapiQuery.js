import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

export const useOkapiQuery = ({ path, searchParams, ...rest }) => {
  const ky = useOkapiKy();

  return useQuery({
    queryKey: [path, searchParams],
    queryFn: () => ky(path, { searchParams }).json(),
    ...rest,
  });
};
