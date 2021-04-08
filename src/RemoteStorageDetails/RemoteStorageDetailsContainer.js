import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  Col,
  Row,
  Button,
  Modal,
  ConfirmationModal,
} from '@folio/stripes/components';
import {
  useShowCallout,
} from '@folio/stripes-acq-components';

import RemoteStorageDetails from './RemoteStorageDetails';

import { STORAGES_LIST_ROUTE } from '../const';

const RemoteStorageDetailsContainer = ({
  mutator,
}) => {
  const intl = useIntl();
  const { id } = useParams();
  const history = useHistory();
  const showCallout = useShowCallout();

  const [storage, setStorage] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigurationUsed, setIsConfigurationUsed] = useState(false);
  const [isDeleteConfirmationShown, setIsDeleteConfirmationShown] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    mutator.configurations.GET()
      .then(setStorage).finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onRemovestorage = useCallback(() => {
    mutator.mappings.GET()
      .then(({ mappings }) => {
        if (mappings.some(item => item.configurationId === id)) {
          setIsConfigurationUsed(true);
        } else {
          setIsDeleteConfirmationShown(true);
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onConfirmRemoving = useCallback(() => {
    mutator.configurations.DELETE(id)
      .then(() => {
        setIsDeleteConfirmationShown(false);
        history.replace({
          pathname: STORAGES_LIST_ROUTE,
        });
        showCallout({ messageId: 'ui-remote-storage.remove.success' });
      })
      .catch(() => {
        showCallout({ messageId: 'ui-remote-storage.remove.error', type: 'error' });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, id, showCallout]);

  const hideConfigurationUsedModal = useCallback(() => {
    setIsConfigurationUsed(false);
  }, []);

  const hideDeleteConfirmationModal = useCallback(() => {
    setIsDeleteConfirmationShown(false);
  }, []);

  return (
    <>
      <RemoteStorageDetails
        storage={storage}
        isLoading={isLoading}
        onRemovestorage={onRemovestorage}
      />

      <Modal
        open={isConfigurationUsed}
        label={intl.formatMessage({ id: 'ui-remote-storage.cannotDeleteModal.header' })
        }
        size="small"
      >
        <Row>
          <Col xs>
            {intl.formatMessage({ id: 'ui-remote-storage.cannotDeleteModal.message' })}
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Button buttonStyle="primary" onClick={hideConfigurationUsedModal}>
              {intl.formatMessage({ id: 'stripes-core.label.okay' })}
            </Button>
          </Col>
        </Row>
      </Modal>

      <ConfirmationModal
        id="delete-confirmation-modal"
        open={isDeleteConfirmationShown}
        heading={intl.formatMessage(
          {
            id: 'ui-remote-storage.removingModal.title',
          },
          {
            name: storage.name,
          },
        )
        }
        message={intl.formatMessage({ id: 'ui-remote-storage.removingModal.message' })}
        onConfirm={onConfirmRemoving}
        onCancel={hideDeleteConfirmationModal}
        confirmLabel={intl.formatMessage({ id: 'ui-remote-storage.delete' })}
      />
    </>
  );
};

RemoteStorageDetailsContainer.manifest = Object.freeze({
  configurations: {
    type: 'okapi',
    path: 'remote-storage/configurations/:{id}',
    accumulate: true,
    fetch: false,
    throwErrors: false,
  },
  mappings: {
    type: 'okapi',
    path: 'remote-storage/mappings',
    accumulate: true,
    fetch: false,
    throwErrors: false,
  },
});

RemoteStorageDetailsContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(RemoteStorageDetailsContainer);
