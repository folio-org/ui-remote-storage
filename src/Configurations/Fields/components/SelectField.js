import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'react-final-form';
import { useIntl } from 'react-intl';

import { Select as AcqSelect } from '@folio/stripes-acq-components';

export const SelectField = ({ name, required = '', options = {}, placeholder, tooltipText, ...rest }) => {
  const { formatMessage } = useIntl();

  const validate = value => (required && (value === undefined) && formatMessage({ id: required }));
  const field = useField(name, { validate });

  const dataOptions = Object.entries(options)
    .map(([value, labelId]) => ({ value, label: formatMessage({ id: labelId }) }));

  return (
    <AcqSelect
      required={required}
      dataOptions={dataOptions}
      placeholder={placeholder && formatMessage({ id: placeholder })}
      tooltipText={tooltipText && formatMessage({ id: tooltipText })}
      {...field}
      {...rest}
    />
  );
};

SelectField.propTypes = {
  ...AcqSelect.propTypes,
  name: PropTypes.string.isRequired,
  options: PropTypes.object,
  required: PropTypes.string, // put validation error message here
};
