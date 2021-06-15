import { AccessionTable } from '../API';
import * as Locations from './Locations';

export const useByConfigurationId = configurationId => {
  const locationsQuery = Locations.useMap();
  const query = AccessionTable.useQuery({ configurationId, enabled: locationsQuery.isSuccess });
  const rows = query.rows.sort((a, b) => Locations.compare(
    locationsQuery.map[a.originalLocationId],
    locationsQuery.map[b.originalLocationId],
  ));

  const createOrUpdateMutation = AccessionTable.useUpdateMutation({ configurationId });
  const deleteMutation = AccessionTable.useDeleteMutation({ configurationId });
  const update = item => (item.finalLocationId ? createOrUpdateMutation.mutate(item) : deleteMutation.mutate(item));

  return {
    ...query,
    rows,
    update,
  };
};
