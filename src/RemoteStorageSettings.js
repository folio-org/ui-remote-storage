import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';
import { Configurations } from './Configurations';
import { AccessionTable } from './AccessionTable';
import { Configurations as API } from './API';

const RemoteStorageSettings = (props) => {
  const query = API.useListQuery();

  const pages = useMemo(() => [
    {
      route: 'configurations',
      label: <FormattedMessage id="ui-remote-storage.configurations.title" />,
      component: Configurations,
    },
    {
      route: query.configurations.length === 1 ? `accession-table/${query.configurations[0].id}` : 'accession-table',
      label: <FormattedMessage id="ui-remote-storage.accession-table.title" />,
      component: AccessionTable,
    },
  ], [query.configurations]);

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
