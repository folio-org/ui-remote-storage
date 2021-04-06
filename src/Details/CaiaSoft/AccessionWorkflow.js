import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useField } from 'react-final-form';

import { Select } from '@folio/stripes-acq-components';

const FIELD_NAME = 'accessionWorkflowDetails';

const validate = value => (
  value !== undefined
    ? undefined
    : <FormattedMessage id="ui-remote-storage.accession-workflow.error.undefined" />
);

export const AccessionWorkflow = props => {
  const { formatMessage } = useIntl();
  const field = useField(FIELD_NAME, { validate });

  const OPTIONS = [
    {
      value: 'Create new holdings record',
      label: formatMessage({ id: 'ui-remote-storage.accession-workflow.option.new' }),
    },
    {
      value: 'Assign to existing holdings record',
      label: formatMessage({ id: 'ui-remote-storage.accession-workflow.option.existing' }),
    },
  ];

  return (
    <Select
      dataOptions={OPTIONS}
      placeholder={formatMessage({ id: 'ui-remote-storage.select' })}
      tooltipText={formatMessage({ id: 'ui-remote-storage.accession-workflow.tooltip' })}
      required
      {...field}
      {...props}
    />
  );
};

AccessionWorkflow.propTypes = Select.propTypes;
