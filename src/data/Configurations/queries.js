import { Configurations } from '../../API';
import { compare } from '../Locations';


export const useListQuery = options => {
  const query = Configurations.useListQuery(options);

  const configurations = query.configurations.sort(compare);

  return {
    configurations,
    ...query,
  };
};


export const useSingleQuery = Configurations.useSingleQuery;
