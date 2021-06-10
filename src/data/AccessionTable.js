import { AccessionTable } from '../API';

export const useByConfigurationId = configurationId => {
  const query = AccessionTable.useQuery();

  return {
    ...query,
    rows: query.rows.map(({ originalLocationId, finalLocationId, remoteConfigurationId }) => ({
      originalLocationId,
      finalLocationId: remoteConfigurationId === configurationId ? finalLocationId : undefined,
    })),
  };
};


