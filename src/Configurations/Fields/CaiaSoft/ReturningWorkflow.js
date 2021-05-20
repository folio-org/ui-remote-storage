import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useField } from 'react-final-form';

import { Select } from '@folio/stripes-acq-components';

const FIELD_NAME = 'returningWorkflowDetails';

const validate = value => (
  value !== undefined
    ? undefined
    : <FormattedMessage id="ui-remote-storage.returning-workflow.error.undefined" />
);

export const ReturningWorkflow = props => {
  const { formatMessage } = useIntl();
  const field = useField(FIELD_NAME, { validate });

  const OPTIONS = [
    {
      value: 'Scanned to folio',
      label: formatMessage({ id: 'ui-remote-storage.returning-workflow.option.folio' }),
    },
    {
      value: 'Scanned to CaiaSoft',
      label: formatMessage({ id: 'ui-remote-storage.returning-workflow.option.ciasoft' }),
    },
  ];

  return (
    <Select
      dataOptions={OPTIONS}
      placeholder={formatMessage({ id: 'ui-remote-storage.select' })}
      tooltipText={formatMessage({ id: 'ui-remote-storage.returning-workflow.tooltip' })}
      required
      {...field}
      {...props}
    />
  );
};

ReturningWorkflow.propTypes = Select.propTypes;
