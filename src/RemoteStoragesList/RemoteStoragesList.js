import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  useHistory,
} from 'react-router-dom';

import {
  Pane,
  MultiColumnList,
  PaneMenu,
  Button,
  LoadingPane,
} from '@folio/stripes/components';

import { IfPermission } from '@folio/stripes/core';

import { STORAGES_LIST_ROUTE } from '../const';

const visibleColumns = ['name', 'providerName', 'lastUpdate'];
const columnMapping = {
  name: <FormattedMessage id="ui-remote-storage.list.name" />,
  providerName: <FormattedMessage id="ui-remote-storage.list.providerName" />,
  lastUpdate: <FormattedMessage id="ui-remote-storage.list.lastUpdate" />,
};

const RemoteStoragesList = ({
  defaultWidth,
  storages,
  isLoading,
  storagesCount,
  onCreateConfiguration,
}) => {
  const history = useHistory();

  const openStorageDetails = useCallback(
    (e, meta) => {
      history.push({
        pathname: `${STORAGES_LIST_ROUTE}/view/${meta.id}`,
      });
    },
    [history],
  );

  const lastMenu = (
    <IfPermission perm="ui-remote-storage.settings.remote-storages.all">
      <PaneMenu>
        <Button
          id="new-remote-storage"
          onClick={onCreateConfiguration}
          buttonStyle="primary"
          marginBottom0
        >
          <FormattedMessage id="stripes-smart-components.new" />
        </Button>
      </PaneMenu>
    </IfPermission>
  );

  if (isLoading) {
    return <LoadingPane />;
  }

  return (
    <Pane
      paneTitle={<FormattedMessage id="ui-remote-storage.meta.title" />}
      defaultWidth={defaultWidth}
      lastMenu={lastMenu}
    >
      <MultiColumnList
        id="storages-list"
        totalCount={storagesCount}
        contentData={storages}
        visibleColumns={visibleColumns}
        columnMapping={columnMapping}
        onRowClick={openStorageDetails}
        autosize
      />
    </Pane>
  );
};

RemoteStoragesList.propTypes = {
  defaultWidth: PropTypes.string,
  storages: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  storagesCount: PropTypes.number,
  onCreateConfiguration: PropTypes.func,
};

RemoteStoragesList.defaultProps = {
  defaultWidth: '50%',
};

export default RemoteStoragesList;
