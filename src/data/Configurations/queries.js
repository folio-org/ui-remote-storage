import { orderBy } from 'lodash';

import { Configurations } from '../../API';


export const useListQuery = options => {
  const query = Configurations.useListQuery(options);

  const configurations = orderBy(query.configurations, ['name']);

  return {
    configurations,
    ...query,
  };
};


export const useSingleQuery = Configurations.useSingleQuery;
