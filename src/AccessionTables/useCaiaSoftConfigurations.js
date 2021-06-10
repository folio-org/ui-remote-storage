import { useMemo } from 'react';

import { Configurations } from '../API';
import { CAIASOFT } from '../const';

export const useCaiaSoftConfigurations = () => {
  const query = Configurations.useListQuery();

  const configurations = useMemo(() => {
    return query.configurations
      .filter(({ providerName }) => providerName === CAIASOFT)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query.configurations]);

  return {
    ...query,
    configurations,
  };
};
