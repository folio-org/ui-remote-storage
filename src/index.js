import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

const RemoteStorageSettings = () => {
  return (
    <Settings
      sections={[]}
      paneTitle={<FormattedMessage id="ui-remote-storage.meta.title" />}
    />
  );
};

export default RemoteStorageSettings;
