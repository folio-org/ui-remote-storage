import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';
import { Configurations } from './Configurations';

const RemoteStorageSettings = (props) => {
  const pages = [
    {
      route: 'configurations',
      label: <FormattedMessage id="ui-remote-storage.configurations.title" />,
      component: Configurations,
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
