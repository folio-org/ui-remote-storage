import { useQueryClient } from 'react-query';
import orderBy from 'lodash/orderBy';
import { API_PATH } from '../const';
import { useOkapiQuery } from './useOkapiQuery';
import { useOkapiMutation } from './useOkapiMutation';


const PATH = `${API_PATH}/configurations`;


export const useListQuery = options => {
  const query = useOkapiQuery({
    path: PATH,
    queryKey: PATH,
    ...options,
  });

  const configurations = orderBy(
      query.data?.configurations ?? [],
      ['name'],
  );

  return {
    configurations,
    ...query,
  };
};


export const useSingleQuery = ({ id, onError, ...rest }) => {
  const queryClient = useQueryClient();

  const query = useOkapiQuery({
    path: `${PATH}/${id}`,
    queryKey: [PATH, id],
    onError: () => {
      // One of the most possible sources of an error here
      // is navigating to the item that was already deleted (from another workplace).
      // Refreshing the list couldn't hurt in this case.
      queryClient.invalidateQueries(PATH, { exact: true });

      return onError?.();
    },
    ...rest,
  });

  return {
    configuration: query.data ?? {},
    ...query,
  };
};


const useMutation = ({ onSettled, ...rest }) => {
  const queryClient = useQueryClient();

  return useOkapiMutation({
    // We refresh the list on any result of item mutation, success or error:
    // One of the most possible sources of an error here
    // is trying to mutate the item that was already deleted (from another workplace).
    // Refreshing the list couldn't hurt in this case.
    onSettled: () => {
      queryClient.invalidateQueries(PATH, { exact: true });

      return onSettled?.();
    },
    ...rest,
  });
};


export const useCreateMutation = options => useMutation({
  method: 'post',
  path: PATH,
  ...options,
});


export const useUpdateMutation = ({ id, onSuccess, ...rest }) => {
  const queryClient = useQueryClient();

  return useMutation({
    method: 'put',
    path: `${PATH}/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries([PATH, id], { exact: true });

      return onSuccess?.();
    },
    ...rest,
  });
};


export const useDeleteMutation = ({ id, ...options }) => useMutation({
  method: 'delete',
  path: `${PATH}/${id}`,
  ...options,
});
