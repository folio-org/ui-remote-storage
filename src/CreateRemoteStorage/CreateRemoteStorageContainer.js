import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  useHistory,
} from 'react-router-dom';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  useShowCallout,
} from '@folio/stripes-acq-components';

import Editor from '../Editor';

import {
  STORAGES_LIST_ROUTE,
} from '../const';

const CreateRemoteStorageContainer = ({
  mutator,
}) => {
  const history = useHistory();
  const showCallout = useShowCallout();

  const onClose = useCallback(
    () => {
      history.push({
        pathname: STORAGES_LIST_ROUTE,
      });
    },
    [history],
  );

  const onSubmit = values => mutator.configurations.POST(values)
    .then(() => {
      history.replace({
        pathname: STORAGES_LIST_ROUTE,
      });
      showCallout({ messageId: 'ui-remote-storage.edit.success.created' });
    })
    .catch(err => {
      showCallout({ messageId: 'ui-remote-storage.edit.error', type: 'error' });
      throw err;
    });

  return (
    <Editor
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

CreateRemoteStorageContainer.manifest = Object.freeze({
  configurations: {
    type: 'okapi',
    path: 'remote-storage/configurations',
    throwErrors: false,
    fetch: false,
  },
});

CreateRemoteStorageContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(CreateRemoteStorageContainer);
