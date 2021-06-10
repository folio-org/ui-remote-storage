import { Locations, Mappings } from '../API';


export const useMap = () => {
  const query = Locations.useListQuery();
  const map = Object.fromEntries(query.locations.map(l => [l.id, l]));

  return {
    map,
    ...query,
  };
};


export const useByConfigurationId = configurationId => {
  const mappingsQuery = Mappings.useListQuery();
  const locationsQuery = Locations.useListQuery();

  const configurations = Object.fromEntries(mappingsQuery.mappings.map(r => [r.folioLocationId, r.configurationId]));

  const queries = [mappingsQuery, locationsQuery];
  const isError = queries.some(q => q.isError);
  const isLoading = !isError && queries.some(q => q.isLoading);
  const isFetching = !isLoading && queries.some(q => q.isFetching);
  const isSuccess = queries.every(q => q.isSuccess);

  const byConfiguration = location => configurations[location.id] === configurationId;

  const locations = locationsQuery.locations
    .filter(byConfiguration)
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    locations,
    isError,
    isLoading,
    isFetching,
    isSuccess,
  };
};


