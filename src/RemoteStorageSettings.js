import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router';

import {
  Paneset,
} from '@folio/stripes/components';
import RemoteStoragesListContainer from './RemoteStoragesList';
import RemoteStorageDetails from './RemoteStorageDetails';
import RemoteStorageEditorContainer from './RemoteStorageEditor';
import CreateRemoteStorageContainer from './CreateRemoteStorage';

import { STORAGES_LIST_ROUTE } from './const';

const RemoteStorageSettings = () => {
  return (
    <Switch>
      <Route
        exact
        path={`${STORAGES_LIST_ROUTE}/edit/:id`}
        component={RemoteStorageEditorContainer}
      />
      <Route
        exact
        path={`${STORAGES_LIST_ROUTE}/create`}
        component={CreateRemoteStorageContainer}
      />
      <Route path={STORAGES_LIST_ROUTE}>
        <Paneset
          paneTitle={<FormattedMessage id="ui-remote-storage.meta.title" />}
        >
          <RemoteStoragesListContainer />
          <Route
            path={`${STORAGES_LIST_ROUTE}/view/:id`}
            component={RemoteStorageDetails}
          />
        </Paneset>
      </Route>
    </Switch>
  );
};

export default withRouter(RemoteStorageSettings);
