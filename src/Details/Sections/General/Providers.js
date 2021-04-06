import React from 'react';
import { useIntl } from 'react-intl';
import { useField } from 'react-final-form';

import { Select } from '@folio/stripes-acq-components';
import { useProvidersOptions } from './useProvidersOptions';

const FIELD_NAME = 'providerName';

export const Providers = props => {
  const { formatMessage } = useIntl();
  const field = useField(FIELD_NAME);

  const options = useProvidersOptions();
  const label = formatMessage({ id: 'ui-remote-storage.details.providerName' });

  return (
    <Select
      area-label={label}
      label={label}
      dataOptions={options}
      required
      {...field}
      {...props}
    />
  );
};

Providers.propTypes = Select.propTypes;
