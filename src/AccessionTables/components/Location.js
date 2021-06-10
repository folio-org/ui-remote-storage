import React from 'react';
import PropTypes from 'prop-types';

import { EmptyMessage } from '@folio/stripes/components';

export const Location = ({ location }) => (
  location
    ? <>{location.name} ({location.code})</>
    : <EmptyMessage />
);

Location.propTypes = {
  location: PropTypes.object,
};
