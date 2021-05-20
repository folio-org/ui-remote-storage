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


export const useSingleQuery = ({ id, ...restOptions }) => {
  const query = useOkapiQuery({
    path: `remote-storage/configurations/${id}`,
    queryKey: ['remote-storage/configurations', id],
    ...restOptions,
  });

  return {
    configuration: query.data,
    ...query,
  };
};


export const useCreateMutation = ({ onSuccess, ...rest }) => {
  const queryClient = useQueryClient();

  return useOkapiMutation({
    method: 'post',
    path: 'remote-storage/configurations',
    onSuccess: () => {
      queryClient.invalidateQueries(['remote-storage/configurations'], { exact: true });

      return onSuccess?.();
    },
    ...rest,
  });
};


export const useUpdateMutation = ({ id, onSuccess, ...rest }) => {
  const queryClient = useQueryClient();

  return useOkapiMutation({
    method: 'put',
    path: `remote-storage/configurations/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries(['remote-storage/configurations'], { exact: true });
      queryClient.invalidateQueries(['remote-storage/configurations', id], { exact: true });

      return onSuccess?.();
    },
    ...rest,
  });
};


export const useDeleteMutation = ({ id, onSuccess, ...rest }) => {
  const queryClient = useQueryClient();

  return useOkapiMutation({
    method: 'delete',
    path: `remote-storage/configurations/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries(['remote-storage/configurations'], { exact: true });

      return onSuccess?.();
    },
    ...rest,
  });
};
