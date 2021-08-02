import { Providers } from '../../../../API';

export const useProvidersOptions = (params) => {
  const { data, isLoading } = Providers.useProviderQuery(params);

  const options = data?.map(({ id, name }) => ({ value: id, label: name }));

  return {
    options,
    isLoading,
  };
};
