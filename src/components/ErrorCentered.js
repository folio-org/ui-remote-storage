import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Centered } from './Centered';

export const ErrorCentered = props => (
  <Centered {...props}>
    <FormattedMessage id="ui-remote-storage.error" />
  </Centered>
);

ErrorCentered.propTypes = Centered.propTypes;
