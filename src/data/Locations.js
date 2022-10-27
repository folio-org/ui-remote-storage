import { Locations, Mappings } from '../API';


export const compare = (a, b) => a.name.localeCompare(b.name);


export const useMap = ({ onError } = {}) => {
  const query = Locations.useListQuery({ onError });
  const map = Object.fromEntries(query.locations.map(l => [l.id, l]));

  return {
    map,
    ...query,
  };
};


export const useByConfigurationId = ({ configurationId, onError }) => {
  const mappingsQuery = Mappings.useListQuery({ onError, staleTime: 0 });
  const locationsQuery = Locations.useListQuery({ onError, staleTime: 0 });

  const configurations = Object.fromEntries(mappingsQuery.mappings.map(r => [r.folioLocationId, r.configurationId]));

  const queries = [mappingsQuery, locationsQuery];
  const isError = queries.some(q => q.isError);
  const isLoading = !isError && queries.some(q => q.isLoading);
  const isFetching = !isLoading && queries.some(q => q.isFetching);
  const isSuccess = queries.every(q => q.isSuccess);

  const byConfiguration = location => configurations[location.id] === configurationId;

  const locations = locationsQuery.locations.filter(byConfiguration).sort(compare);

  return {
    locations,
    isError,
    isLoading,
    isFetching,
    isSuccess,
  };
};


