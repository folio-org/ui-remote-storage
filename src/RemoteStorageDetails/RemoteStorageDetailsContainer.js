import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  stripesConnect,
} from '@folio/stripes/core';

import RemoteStorageDetails from './RemoteStorageDetails';

const RemoteStorageDetailsContainer = ({
  mutator,
  match: { params },
}) => {
  const [storage, setStorage] = useState({});
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    mutator.configurations.GET({
      path: `remote-storage/configurations/${params.id}`,
    }).then(setStorage).finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <RemoteStorageDetails
      storage={storage}
      isLoading={isLoading}
    />
  );
};

RemoteStorageDetailsContainer.manifest = Object.freeze({
  configurations: {
    type: 'okapi',
    path: 'remote-storage/configurations',
    accumulate: true,
    throwErrors: false,
  },
});

RemoteStorageDetailsContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default stripesConnect(RemoteStorageDetailsContainer);
