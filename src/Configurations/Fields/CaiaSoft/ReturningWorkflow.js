import React from 'react';

import { SelectField } from '../components';

const OPTIONS = {
  'Scanned to folio': 'ui-remote-storage.returning-workflow.option.folio',
  'Scanned to CaiaSoft': 'ui-remote-storage.returning-workflow.option.ciasoft',
};

export const ReturningWorkflow = props => (
  <SelectField
    name="returningWorkflowDetails"
    options={OPTIONS}
    placeholder="ui-remote-storage.select"
    tooltipText="ui-remote-storage.returning-workflow.tooltip"
    required="ui-remote-storage.returning-workflow.error.undefined"
    {...props}
  />
);

ReturningWorkflow.propTypes = SelectField.propTypes;
