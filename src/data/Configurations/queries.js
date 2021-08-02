import { Configurations } from '../../API';
import * as Providers from '../Providers';

export const useListQuery = options => {
  const query = Configurations.useListQuery(options);
  const { map } = Providers.useMap();

  const configurations = [...query.configurations]
    .map((configuration) => (
      {
        ...configuration,
        providerName: map[configuration.providerName],
      }
    ))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    ...query,
    configurations,
  };
};


export const useSingleQuery = Configurations.useSingleQuery;
