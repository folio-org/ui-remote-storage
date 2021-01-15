import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  stripesConnect,
  useStripes,
} from '@folio/stripes/core';

import RemoteStoragesList from './RemoteStoragesList';

const RemoteStoragesListContainer = ({
  mutator,
}) => {
  const stripes = useStripes();

  const [storagesList, setStoragesList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [storagesCount, setStoragesCount] = useState();

  const localeDateFormat = useMemo(() => (
    moment.localeData(stripes.locale).longDateFormat('L')
  ), [stripes.locale]);

  useEffect(() => {
    setIsLoading(true);
    mutator.configurations.GET().then(({ totalRecords, configurations }) => {
      setStoragesList(prev => [
        ...prev,
        ...configurations.map(storage => {
          const lastUpdate = moment.utc(storage.metadata.updatedDateю || storage.metadata.createdDate);

          return {
            ...storage,
            lastUpdate: lastUpdate.format(localeDateFormat),
          };
        }),
      ]);
      setStoragesCount(totalRecords);
    }).finally(() => setIsLoading(false));
  }, [mutator, localeDateFormat]);

  return (
    <RemoteStoragesList
      storages={storagesList}
      isLoading={isLoading}
      storagesCount={storagesCount}
    />
  );
};

RemoteStoragesListContainer.manifest = Object.freeze({
  configurations: {
    type: 'okapi',
    path: 'remote-storage/configurations',
    accumulate: true,
    throwErrors: false,
  },
  // mappings: {
  //   type: 'okapi',
  //   path: 'remote-storage/mappings',
  //   records: 'mappings',
  //   pk: 'folioLocationId',
  //   clientGeneratePk: false, // because we use POST instead of PUT for modification here (there's no PUT)
  //   throwErrors: false,
  // },
});

RemoteStoragesListContainer.propTypes = {

  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(RemoteStoragesListContainer);
