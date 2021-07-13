import React from 'react';
import PropTypes from 'prop-types';

import { EmptyMessage } from '@folio/stripes/components';

export const Location = ({ location, label }) => {
  if (!location?.id) return <EmptyMessage />;

  let defaultText = location.name;

  if (location.code) defaultText += ` (${location.code})`;

  return (typeof label === 'string' && label)
    || (typeof label === 'function' && label(defaultText))
    || defaultText;
};

Location.textFields = ['name', 'code'];

Location.propTypes = {
  location: PropTypes.object,
  component: PropTypes.elementType,
};
