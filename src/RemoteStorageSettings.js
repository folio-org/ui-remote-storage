import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, withRouter } from 'react-router';

import {
  Paneset,
} from '@folio/stripes/components';
import RemoteStoragesListContainer from './RemoteStoragesList';
import RemoteStorageDetails from './RemoteStorageDetails';
import RemoteStorageEditorContainer from './RemoteStorageEditor';
import CreateRomoteStoargeContainer from './CreateRemoteStorage';

import { STORAGES_LIST_ROUTE } from './const';

const RemoteStorageSettings = () => {
  return (
    <>
      <Paneset
        paneTitle={<FormattedMessage id="ui-remote-storage.meta.title" />}
      >
        <Route
          path={STORAGES_LIST_ROUTE}
          component={RemoteStoragesListContainer}
        />
        <Route
          path={`${STORAGES_LIST_ROUTE}/view/:id`}
          component={RemoteStorageDetails}
        />
      </Paneset>
      <Route
        path={`${STORAGES_LIST_ROUTE}/edit/:id`}
        component={RemoteStorageEditorContainer}
      />
      <Route
        path={`${STORAGES_LIST_ROUTE}/create`}
        component={CreateRomoteStoargeContainer}
      />
    </>
  );
};

export default withRouter(RemoteStorageSettings);
