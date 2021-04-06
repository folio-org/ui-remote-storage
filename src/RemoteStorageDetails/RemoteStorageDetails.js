import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { useIntl } from 'react-intl';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import { Form } from 'react-final-form';

import {
  Pane,
  LoadingPane,
  MenuSection,
  Icon,
  Button,
} from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';

import {
  STORAGES_LIST_ROUTE,
} from '../const';

import { Details } from '../Details';

const RemoteStorageDetails = ({
  defaultWidth,
  storage,
  isLoading,
  onRemovestorage,
}) => {
  const history = useHistory();
  const { id } = useParams();
  const intl = useIntl();

  const renderActionMenu = useCallback(() => (
    <IfPermission perm="ui-remote-storage.settings.remote-storages.all">
      <MenuSection id="storage-details-actions">
        <Button
          id="clickable-edit-storage"
          buttonStyle="dropdownItem"
          data-test-button-edit-storage
          to={{
            pathname: `${STORAGES_LIST_ROUTE}/edit/${id}`,
          }}
        >
          <Icon size="small" icon="edit">
            {intl.formatMessage({ id: 'ui-remote-storage.edit' })}
          </Icon>
        </Button>

        <Button
          id="clickable-delete-storage"
          buttonStyle="dropdownItem"
          data-test-button-delete-storage
          onClick={onRemovestorage}
        >
          <Icon size="small" icon="trash">
            {intl.formatMessage({ id: 'ui-remote-storage.delete' })}
          </Icon>
        </Button>
      </MenuSection>
    </IfPermission>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [id]);

  const closePane = useCallback(
    () => {
      history.push({
        pathname: STORAGES_LIST_ROUTE,
      });
    },
    [history],
  );

  if (isLoading) {
    return <LoadingPane />;
  }

  return (
    <Pane
      data-testid="storage-details-pane"
      actionMenu={renderActionMenu}
      paneTitle={storage.name}
      defaultWidth={defaultWidth}
      onClose={closePane}
      dismissible
    >
      <Form
        onSubmit={noop}
        initialValues={storage}
      >
        {() => <Details isNonInteractive />}
      </Form>
    </Pane>
  );
};

RemoteStorageDetails.propTypes = {
  defaultWidth: PropTypes.string,
  storage: PropTypes.object,
  isLoading: PropTypes.bool,
  onRemovestorage: PropTypes.func,
};

RemoteStorageDetails.defaultProps = {
  defaultWidth: '50%',
};

export default RemoteStorageDetails;
