import React from 'react';
import { useIntl } from 'react-intl';
import { useField } from 'react-final-form';

import { Select } from '@folio/stripes-acq-components';
import { useProvidersOptions } from './useProvidersOptions';

const FIELD_NAME = 'providerName';

export const Providers = props => {
  const { formatMessage } = useIntl();
  const { options, isLoading } = useProvidersOptions();

  const field = useField(FIELD_NAME, {
    validate: value => !(options?.some(option => option.value === value)) &&
      formatMessage({ id: 'ui-remote-storage.details.providerName.error' }),
  });

  const label = formatMessage({ id: 'ui-remote-storage.details.providerName' });
  const dataOptions = !isLoading ? options : [{ label: formatMessage({ id: 'ui-remote-storage.loading' }) }];
  const placeholder = isLoading ? undefined : formatMessage({ id: 'ui-remote-storage.select' })

  return (
    <Select
      area-label={label}
      label={label}
      placeholder={placeholder}
      dataOptions={dataOptions}
      disabled={isLoading}
      required
      {...field}
      {...props}
    />
  );
};

Providers.propTypes = Select.propTypes;
