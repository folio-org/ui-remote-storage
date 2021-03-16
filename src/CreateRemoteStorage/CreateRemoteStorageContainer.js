import React, { useEffect, useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  useHistory,
} from 'react-router-dom';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  ConfirmationModal,
} from '@folio/stripes/components';
import {
  useShowCallout,
} from '@folio/stripes-acq-components';

import RemoteStorageForm from '../RemoteStorageForm';

import {
  STORAGES_LIST_ROUTE,
  DEMATIC_SD,
  CAIASOFT,
} from '../const';

const CreateRemoteStorageContainer = ({
  mutator,
}) => {
  const history = useHistory();
  const showCallout = useShowCallout();

  const [providers, setProviders] = useState([]);
  const [createdRemoteStorage, setCreatedRemoteStorage] = useState({});
  const [isConfirmationModalOpened, setIsConfirmationModalOpened] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    mutator.providers.GET()
      .then((providersResponse) => {
        setProviders(providersResponse.map(provider => ({
          value: provider.id,
          label: provider.name,
        })));
      }).finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(
    () => {
      history.push({
        pathname: STORAGES_LIST_ROUTE,
      });
    },
    [history],
  );

  const onSubmit = useCallback(
    (formValue) => {
      setIsConfirmationModalOpened(true);
      if (formValue.providerName !== DEMATIC_SD) delete formValue.statusUrl;
      if (formValue.providerName !== CAIASOFT) delete formValue.apiKey;
      setCreatedRemoteStorage(formValue);
    },
    [],
  );

  const onSubmitCreation = useCallback(
    () => {
      mutator.configurations.POST(createdRemoteStorage)
        .then(() => {
          history.replace({
            pathname: `${STORAGES_LIST_ROUTE}`,
          });
          showCallout({ messageId: 'ui-remote-storage.create.success' });
        })
        .catch(() => {
          showCallout({ messageId: 'ui-remote-storage.create.error', type: 'error' });
        })
        .finally(() => setIsConfirmationModalOpened(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createdRemoteStorage, history, showCallout],
  );

  return (
    <>
      <RemoteStorageForm
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
            id="ui-remote-storage.createForm.title"
          />
        }
        message={<FormattedMessage id="ui-remote-storage.confirmationModal.create.message" />}
        onConfirm={onSubmitCreation}
        onCancel={onClose}
        confirmLabel={<FormattedMessage id="ui-remote-storage.confirmationModal.save" />}
      />
    </>
  );
};

CreateRemoteStorageContainer.manifest = Object.freeze({
  configurations: {
    type: 'okapi',
    path: 'remote-storage/configurations',
    throwErrors: false,
  },
  providers: {
    type: 'okapi',
    path: 'remote-storage/providers',
    accumulate: true,
    throwErrors: false,
    fetch: false,
  },
});

CreateRemoteStorageContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(CreateRemoteStorageContainer);
