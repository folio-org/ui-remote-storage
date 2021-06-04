import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Centered } from './Centered';

export const NoConfigurations = props => (
  <Centered {...props}>
    <FormattedMessage id="ui-remote-storage.accession-tables.empty" />
  </Centered>
);

NoConfigurations.propTypes = Centered.propTypes;
