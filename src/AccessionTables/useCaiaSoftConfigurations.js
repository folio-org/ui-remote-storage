import orderBy from 'lodash/orderBy';
import { Configurations } from '../API';
import { CAIASOFT } from '../const';

export const useCaiaSoftConfigurations = () => {
  const query = Configurations.useListQuery();

  const configurations = orderBy(
    query.configurations.filter(({ providerName }) => providerName === CAIASOFT),
    ['name'],
  );

  return {
    ...query,
    configurations,
  };
};
