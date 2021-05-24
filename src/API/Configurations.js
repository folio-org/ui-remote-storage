import { useQueryClient } from 'react-query';

import { useOkapiQuery } from './useOkapiQuery';
import { useOkapiMutation } from './useOkapiMutation';


export const useListQuery = options => {
  const query = useOkapiQuery({
    path: 'remote-storage/configurations',
    queryKey: 'remote-storage/configurations',
    ...options,
  });

  return {
    configurations: query.data?.configurations ?? [],
    ...query,
  };
};


export const useSingleQuery = ({ id, onError, ...rest }) => {
  const queryClient = useQueryClient();

  const query = useOkapiQuery({
    path: `remote-storage/configurations/${id}`,
    queryKey: ['remote-storage/configurations', id],
    onError: () => {
      // One of the most possible source of an error here
      // is navigating to the item that was already deleted (from another workplace).
      // Refreshing the list couldn't hurt in this case.
      queryClient.invalidateQueries(['remote-storage/configurations'], { exact: true });

      return onError?.();
    },
    ...rest,
  });

  return {
    configuration: query.data,
    ...query,
  };
};


const useMutation = ({ onSuccess, ...rest }) => {
  const queryClient = useQueryClient();

  return useOkapiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['remote-storage/configurations'], { exact: true });

      return onSuccess?.();
    },
    ...rest,
  });
};


export const useCreateMutation = options => useMutation({
  method: 'post',
  path: 'remote-storage/configurations',
  ...options,
});


export const useUpdateMutation = ({ id, onSuccess, ...rest }) => {
  const queryClient = useQueryClient();

  return useMutation({
    method: 'put',
    path: `remote-storage/configurations/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries(['remote-storage/configurations', id], { exact: true });

      return onSuccess?.();
    },
    ...rest,
  });
};


export const useDeleteMutation = ({ id, ...options }) => useMutation({
  method: 'delete',
  path: `remote-storage/configurations/${id}`,
  ...options,
});
