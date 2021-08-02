import { useOkapiQuery } from './useOkapiQuery';

export const useProviderQuery = options => {
  const query = useOkapiQuery({
    path: 'remote-storage/providers',
    ...options,
  });

  return {
    providers: query?.data ?? [],
    ...query,
  };
};
