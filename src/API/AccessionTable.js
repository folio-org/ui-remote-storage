import { useQueryClient } from 'react-query';

import { API_PATH } from '../const';
import { useOkapiQuery } from './useOkapiQuery';
import { useOkapiMutation } from './useOkapiMutation';


const COMMON_PATH = `${API_PATH}/extended-mappings`;
const QUERY_PATH = `${COMMON_PATH}/locations`;
const MUTATION_PATH = COMMON_PATH;


export const useQuery = options => {
  const query = useOkapiQuery({
    path: QUERY_PATH,
    queryKey: QUERY_PATH, // todo: refine key machinery
    ...options,
  });

  return {
    rows: query?.data?.mappings ?? [],
    ...query,
  };
};


const useMutation = ({ onSettled, ...rest } = {}) => {
  const queryClient = useQueryClient();

  return useOkapiMutation({
    // We refresh the list on any result of item mutation, success or error:
    // One of the most possible sources of an error here
    // is trying to mutate the item that was already deleted (from another workplace).
    // Refreshing the list couldn't hurt in this case.
    onSettled: () => {
      // todo: `invalidateQueries` temporarily changed to `resetQueries` to deal with <EditableList> lack of refresh
      // queryClient.invalidateQueries(QUERY_PATH, { exact: true, refetchInactive: true });
      queryClient.resetQueries(QUERY_PATH, { exact: true, refetchInactive: true });

      return onSettled?.();
    },
    ...rest,
  });
};


export const useCreateOrUpdateMutation = options => useMutation({
  method: 'post',
  path: MUTATION_PATH,
  ...options,
});


export const useDeleteMutation = options => useMutation({
  method: 'delete',
  path: item => `${MUTATION_PATH}/${item.remoteConfigurationId}/${item.originalLocationId}`,
  ...options,
});
