import { useOkapiQuery } from './useOkapiQuery';

export const useListQuery = options => {
  const query = useOkapiQuery({
    path: 'locations',
    ...options,
  });

  return {
    locations: query?.data?.locations ?? [],
    ...query,
  };
};
