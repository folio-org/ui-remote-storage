import React from 'react';
import { useIntl } from 'react-intl';

import { RequiredSelectField } from '../components';

export const AccessionWorkflow = props => {
  const { formatMessage } = useIntl();

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
    <RequiredSelectField
      name="accessionWorkflowDetails"
      dataOptions={OPTIONS}
      requiredErrorMessage={formatMessage({ id: 'ui-remote-storage.accession-workflow.error.undefined' })}
      placeholder={formatMessage({ id: 'ui-remote-storage.select' })}
      tooltipText={formatMessage({ id: 'ui-remote-storage.accession-workflow.tooltip' })}
      {...props}
    />
  );
};

AccessionWorkflow.propTypes = RequiredSelectField.propTypes;
