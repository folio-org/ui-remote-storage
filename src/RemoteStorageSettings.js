import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';
import RemoteStorageRoutes from './RemoteStorageRoutes';

const RemoteStorageSettings = (props) => {
  const pages = [
    {
      route: 'configurations',
      label: <FormattedMessage id="ui-remote-storage.configurations.title" />,
      component: RemoteStorageRoutes,
    },
  ];

  return (
    <Settings
      {...props}
      pages={pages}
      paneTitle={<FormattedMessage id="ui-remote-storage.meta.title" />}
      navPaneWidth="20%"
    />
  );
};

export default RemoteStorageSettings;
