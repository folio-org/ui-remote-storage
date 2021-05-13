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
      value: 'Change permanent location',
      label: formatMessage({ id: 'ui-remote-storage.accession-workflow.option.change' }),
    },
    {
      value: 'Duplicate holdings',
      label: formatMessage({ id: 'ui-remote-storage.accession-workflow.option.duplicate' }),
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
