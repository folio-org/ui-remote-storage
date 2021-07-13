import { Configurations } from '../data';
import { CAIASOFT } from '../const';

export const useCaiaSoftConfigurations = (options) => {
  const query = Configurations.useListQuery(options);

  const configurations = query.configurations.filter(({ providerName }) => providerName === CAIASOFT);

  return {
    ...query,
    configurations,
  };
};
