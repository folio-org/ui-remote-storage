import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useField } from 'react-final-form';

import { Select } from '@folio/stripes-acq-components';
import { useProvidersOptions } from './useProvidersOptions';

const FIELD_NAME = 'providerName';
const LABEL = <FormattedMessage id="ui-remote-storage.details.providerName" />;

export const Providers = props => {
  const field = useField(FIELD_NAME);

  const options = useProvidersOptions();

  return (
    <Select
      area-label={LABEL}
      label={LABEL}
      dataOptions={options}
      required
      {...field}
      {...props}
    />
  );
};

Providers.propTypes = Select.propTypes;
