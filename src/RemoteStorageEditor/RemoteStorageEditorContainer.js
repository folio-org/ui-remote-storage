import React, { useEffect, useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  useHistory,
  useParams,
} from 'react-router-dom';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  ConfirmationModal,
} from '@folio/stripes/components';

import RemoteStorageEditor from './RemoteStorageEditor';

import {
  STORAGES_LIST_ROUTE,
} from '../const';

const RemoteStorageEditorContainer = ({
  mutator,
}) => {
  const history = useHistory();
  const { id } = useParams();

  const [storage, setStorage] = useState({});
  const [providers, setProviders] = useState([]);
  const [editedRemoteStorage, setEditedRemoteStorage] = useState();
  const [isConfirmationModalOpened, setIsConfirmationModalOpened] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    const providersPromise = mutator.providers.GET();
    const configurationsPromise = mutator.configurations.GET({
      path: `remote-storage/configurations/${id}`,
    });

    Promise.all([providersPromise, configurationsPromise])
      .then(([providersResponse, configurationsResponse]) => {
        setProviders(providersResponse.map(provider => ({
          value: provider.id,
          label: provider.name,
        })));
        setStorage(configurationsResponse);
      }).finally(() => setIsLoading(false));
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

  const onSubmit = useCallback(
    (formValue) => {
      setIsConfirmationModalOpened(true);
      setEditedRemoteStorage(formValue);
    },
    [],
  );

  const onSubmitEdition = useCallback(
    () => {
      mutator.configurations.PUT(editedRemoteStorage)
        .then(onClose)
        .finally(() => setIsConfirmationModalOpened(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editedRemoteStorage],
  );

  return (
    <>
      <RemoteStorageEditor
        initialValues={storage}
        providers={providers}
        isLoading={isLoading}
        onClose={onClose}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        id="save-confirmation-modal"
        open={isConfirmationModalOpened}
        heading={
          <FormattedMessage
            id="ui-remote-storage.editForm.title"
            values={{ name: storage.name }}
          />
        }
        message={<FormattedMessage id="ui-remote-storage.confirmationModal.message" />}
        onConfirm={onSubmitEdition}
        onCancel={onClose}
        confirmLabel={<FormattedMessage id="ui-remote-storage.confirmationModal.save" />}
      />
    </>
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
  providers: {
    type: 'okapi',
    path: 'remote-storage/providers',
    accumulate: true,
    throwErrors: false,
    fetch: false,
  },
});

RemoteStorageEditorContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(RemoteStorageEditorContainer);
