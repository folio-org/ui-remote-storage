import { API_PATH } from '../const';
import { useOkapiQuery } from './useOkapiQuery';

export const useListQuery = options => {
  const query = useOkapiQuery({
    path: `${API_PATH}/mappings`,
    ...options,
  });

  return {
    mappings: query?.data?.mappings ?? [],
    ...query,
  };
};
