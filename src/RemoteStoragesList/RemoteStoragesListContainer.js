import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';

import {
  stripesConnect,
  useStripes,
} from '@folio/stripes/core';

import { useLocationReset } from '@folio/stripes-acq-components';

import RemoteStoragesList from './RemoteStoragesList';

import { STORAGES_LIST_ROUTE } from '../const';

const RemoteStoragesListContainer = ({
  mutator: originMutator,
}) => {
  const stripes = useStripes();
  const location = useLocation();
  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mutator = useMemo(() => originMutator, []);
  const [storagesList, setStoragesList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [storagesCount, setStoragesCount] = useState();

  const localeDateFormat = useMemo(() => (
    moment.localeData(stripes.locale).longDateFormat('L')
  ), [stripes.locale]);

  const loadConfigurations = useCallback(() => {
    setIsLoading(true);
    mutator.configurations.GET().then(({ totalRecords, configurations }) => {
      setStoragesList(prev => [
        ...prev,
        ...configurations.map(storage => {
          const lastUpdate = moment.utc(storage.metadata.updatedDate || storage.metadata.createdDate);

          return {
            ...storage,
            lastUpdate: lastUpdate.format(localeDateFormat),
          };
        }),
      ]);
      setStoragesCount(totalRecords);
    }).finally(() => setIsLoading(false));
  }, [mutator.configurations, localeDateFormat]);

  const refreshList = () => {
    setStoragesList([]);
    loadConfigurations();
  };

  useEffect(() => {
    loadConfigurations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newStorage = useCallback(() => {
    mutator.configurations.POST({
      name: 'RS2',
      providerName: 'DEMATIC_EMS',
      url: 'http://rs2.dematic.com',
      accessionDelay: 2,
      accessionTimeUnit: 'minutes',
    });
  }, []);

  useLocationReset(history, location, STORAGES_LIST_ROUTE, refreshList);

  return (
    <RemoteStoragesList
      storages={storagesList}
      isLoading={isLoading}
      storagesCount={storagesCount}
      newStorage={newStorage}
    />
  );
};

RemoteStoragesListContainer.manifest = Object.freeze({
  configurations: {
    type: 'okapi',
    path: 'remote-storage/configurations',
    accumulate: true,
    throwErrors: false,
    clientGeneratePk: false,
  },
});

RemoteStoragesListContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(RemoteStoragesListContainer);
