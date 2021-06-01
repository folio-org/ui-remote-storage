import { useOkapiKy } from '@folio/stripes/core';
import { useMutation } from 'react-query';

export const useOkapiMutation = ({ path, method = 'post', ...rest }) => {
  const ky = useOkapiKy();
  const mutationFn = json => ky[method](path, { json });

  return useMutation({ mutationFn, ...rest });
};
