import { Providers } from '../../../../API';

export const useProvidersOptions = (params) => {
  const { providers, isLoading } = Providers.useProviderQuery(params);

  const options = providers?.map(({ id, name }) => ({ value: id, label: name }));

  return {
    options,
    isLoading,
  };
};
