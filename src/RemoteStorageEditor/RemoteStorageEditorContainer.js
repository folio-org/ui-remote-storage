import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  useHistory,
  useParams,
} from 'react-router-dom';

import {
  stripesConnect,
} from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import Editor from '../Editor';

import {
  STORAGES_LIST_ROUTE,
} from '../const';

const RemoteStorageEditorContainer = ({
  mutator,
}) => {
  const history = useHistory();
  const showCallout = useShowCallout();
  const { id } = useParams();

  const [storage, setStorage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    mutator.configurations.GET({ path: `remote-storage/configurations/${id}` })
      .then(setStorage)
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onClose = useCallback(
    () => {
      history.push({
        pathname: `${STORAGES_LIST_ROUTE}/view/${id}`,
      });
    },
    [history, id],
  );

  const onSubmit = values => mutator.configurations.PUT(values)
    .then(() => {
      onClose();
      showCallout({ messageId: 'ui-remote-storage.edit.success.changed' });
    })
    .catch(err => {
      showCallout({ messageId: 'ui-remote-storage.edit.error', type: 'error' });
      throw err;
    });

  return (
    <Editor
      initialValues={storage}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

RemoteStorageEditorContainer.manifest = Object.freeze({
  configurations: {
    type: 'okapi',
    path: 'remote-storage/configurations',
    accumulate: true,
    throwErrors: false,
    fetch: false,
  },
});

RemoteStorageEditorContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(RemoteStorageEditorContainer);
