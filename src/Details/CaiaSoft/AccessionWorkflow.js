import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useField } from 'react-final-form';

import { Select } from '@folio/stripes-acq-components';

const FIELD_NAME = 'accessionWorkflowDetails';

const OPTIONS = [
  {
    value: 'Create new holdings record',
    label: 'Create new holdings record',
  },
  {
    value: 'Assign to existing holdings record',
    label: 'Assign to existing holdings record',
  },
];

const validate = value => (
  value !== undefined
    ? undefined
    : <FormattedMessage id="ui-remote-storage.accession-workflow.error.undefined" />
);

export const AccessionWorkflow = props => {
  const { formatMessage } = useIntl();
  const field = useField(FIELD_NAME, { validate });

  return (
    <Select
      dataOptions={OPTIONS}
      placeholder={formatMessage({ id: 'ui-remote-storage.select' })}
      required
      {...field}
      {...props}
    />
  );
};

AccessionWorkflow.propTypes = Select.propTypes;
