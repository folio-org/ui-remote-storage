import { useOkapiQuery } from './useOkapiQuery';

export const useListQuery = options => {
  const query = useOkapiQuery({
    path: 'remote-storage/mappings',
    ...options,
  });

  return {
    mappings: query?.data?.mappings ?? [],
    ...query,
  };
};
