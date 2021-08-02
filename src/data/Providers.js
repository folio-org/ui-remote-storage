import { Providers } from '../API';

export const useMap = (params) => {
  const query = Providers.useProviderQuery(params);
  const map = query.providers.reduce((acc, el) => {
    acc[el.id] = el.name;

    return acc;
  }, {});

  return {
    map,
    ...query,
  };
};
