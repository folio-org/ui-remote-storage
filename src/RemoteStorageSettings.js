import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, withRouter } from 'react-router';

import {
  Paneset,
} from '@folio/stripes/components';
import RemoteStoragesListContainer from './RemoteStoragesList';
import RemoteStorageDetails from './RemoteStorageDetails';

import { STORAGES_LIST_ROUTE } from './const';

const RemoteStorageSettings = () => {
  return (
    <Paneset
      paneTitle={<FormattedMessage id="ui-remote-storage.meta.title" />}
    >
      <RemoteStoragesListContainer />
      <Route
        path={`${STORAGES_LIST_ROUTE}/view/:id`}
        component={RemoteStorageDetails}
      />
    </Paneset>
  );
};

export default withRouter(RemoteStorageSettings);
