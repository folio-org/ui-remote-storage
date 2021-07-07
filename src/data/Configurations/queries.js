import { Configurations } from '../../API';


export const useListQuery = options => {
  const query = Configurations.useListQuery(options);

  const configurations = [...query.configurations].sort((a, b) => a.name.localeCompare(b.name));

  return {
    ...query,
    configurations,
  };
};


export const useSingleQuery = Configurations.useSingleQuery;
