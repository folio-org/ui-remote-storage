import { Configurations } from '../../API';
import { prepareMutationValues } from './prepareMutationValues';

const customizeMutation = mutation => {
  const mutate = (variables, ...rest) => mutation.mutate(prepareMutationValues(variables), ...rest);
  const mutateAsync = (variables, ...rest) => mutation.mutateAsync(prepareMutationValues(variables), ...rest);

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};

export const useCreateMutation = options => customizeMutation(Configurations.useCreateMutation(options));

export const useUpdateMutation = options => customizeMutation(Configurations.useUpdateMutation(options));

// No need to extra-prepare data for this one
export const useDeleteMutation = Configurations.useDeleteMutation;
