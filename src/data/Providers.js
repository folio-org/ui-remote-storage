import { Providers } from '../API';

export const useMap = () => {
  const query = Providers.useProviderQuery();
  const map = Object.fromEntries(query.providers.map(l => [l.id, l.name]));

  return {
    map,
    ...query,
  };
};
