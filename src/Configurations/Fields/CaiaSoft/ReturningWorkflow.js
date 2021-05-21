import React from 'react';
import { useIntl } from 'react-intl';

import { RequiredSelectField } from '../components';

export const ReturningWorkflow = props => {
  const { formatMessage } = useIntl();

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
    <RequiredSelectField
      name="returningWorkflowDetails"
      dataOptions={OPTIONS}
      requiredErrorMessage={formatMessage({ id: 'ui-remote-storage.returning-workflow.error.undefined' })}
      placeholder={formatMessage({ id: 'ui-remote-storage.select' })}
      tooltipText={formatMessage({ id: 'ui-remote-storage.returning-workflow.tooltip' })}
      {...props}
    />
  );
};

ReturningWorkflow.propTypes = RequiredSelectField.propTypes;
