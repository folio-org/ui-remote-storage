import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'react-final-form';

import { Select as AcqSelect } from '@folio/stripes-acq-components';

export const RequiredSelectField = ({ name, requiredErrorMessage, ...rest }) => {
  const validate = value => (
    value !== undefined
      ? undefined
      : requiredErrorMessage
  );

  const field = useField(name, { validate });

  return (
    <AcqSelect
      {...field}
      {...rest}
      required
    />
  );
};

RequiredSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  requiredErrorMessage: PropTypes.string.isRequired,
  ...AcqSelect.propTypes,
};
