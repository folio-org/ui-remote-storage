import React from 'react';
import { useIntl } from 'react-intl';
import { useField } from 'react-final-form';

import { Select } from '@folio/stripes-acq-components';
import { useProvidersOptions } from './useProvidersOptions';

const FIELD_NAME = 'providerName';

export const Providers = props => {
  const { formatMessage } = useIntl();
  const { options, isLoading } = useProvidersOptions();

  const byValidity = (value, { valid, invalid }) => (options?.some(option => option.value === value) ? valid : invalid);

  const field = useField(FIELD_NAME, {
    validate: value => byValidity(value, {
      invalid: formatMessage({ id: 'ui-remote-storage.details.providerName.error' }),
    }),
    format: value => byValidity(value, { valid: value, invalid: '' }),
  });

  const label = formatMessage({ id: 'ui-remote-storage.details.providerName' });
  const placeholder = formatMessage({ id: isLoading ? 'ui-remote-storage.loading' : 'ui-remote-storage.select' });

  return (
    <Select
      area-label={label}
      label={label}
      placeholder={placeholder}
      dataOptions={options}
      disabled={isLoading}
      required
      {...field}
      {...props}
    />
  );
};

Providers.propTypes = Select.propTypes;
