import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

const API = 'remote-storage/providers';
const LIMIT = 1000;

export const useProvidersOptions = () => {
  const ky = useOkapiKy();

  const searchParams = { limit: LIMIT };
  const queryKey = [API, searchParams];
  const queryFn = () => ky(API, { searchParams }).json();

  const { data } = useQuery({ queryKey, queryFn });

  const options = data?.map(({ id, name }) => ({ value: id, label: name }));

  return options;
};
