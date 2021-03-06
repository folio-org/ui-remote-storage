import { Configurations } from '../data';
import { CAIASOFT } from '../const';

export const useCaiaSoftConfigurations = () => {
  const query = Configurations.useListQuery();

  const configurations = query.configurations.filter(({ providerName }) => providerName === CAIASOFT);

  return {
    ...query,
    configurations,
  };
};
