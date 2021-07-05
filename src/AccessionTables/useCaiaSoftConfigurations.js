import { useMemo } from 'react';

import { Configurations } from '../API';
import { CAIASOFT } from '../const';
import { useSort } from '../util/useSort';

export const useCaiaSoftConfigurations = () => {
  const query = Configurations.useListQuery();

  const { sortedData: configurations } = useSort({
    initialData: useMemo(() => query.configurations
      .filter(({ providerName }) => providerName === CAIASOFT), [query.configurations]),
    sortByField: 'name',
  });

  return {
    ...query,
    configurations,
  };
};
