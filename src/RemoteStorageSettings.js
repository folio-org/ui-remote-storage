import '../polyfills';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';
import { Configurations } from './Configurations';
import { AccessionTables } from './AccessionTables';

const pages = [
  {
    route: 'configurations',
    label: <FormattedMessage id="ui-remote-storage.configurations.title" />,
    component: Configurations,
    perm: 'ui-remote-storage.settings.remote-storages.view',
  },
  {
    route: 'accession-tables',
    label: <FormattedMessage id="ui-remote-storage.accession-tables.title" />,
    component: AccessionTables,
    perm: 'ui-remote-storage.settings.remote-storages.view',
  },
];

const RemoteStorageSettings = (props) => (
  <Settings
    {...props}
    pages={pages}
    paneTitle={<FormattedMessage id="ui-remote-storage.meta.title" />}
    navPaneWidth="20%"
  />
);

export default RemoteStorageSettings;
