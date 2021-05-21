import React from 'react';

import { SelectField } from '../components';

const OPTIONS = {
  'Change permanent location': 'ui-remote-storage.accession-workflow.option.change',
  'Duplicate holdings': 'ui-remote-storage.accession-workflow.option.duplicate',
};

export const AccessionWorkflow = props => (
  <SelectField
    name="accessionWorkflowDetails"
    options={OPTIONS}
    placeholder="ui-remote-storage.select"
    tooltipText="ui-remote-storage.accession-workflow.tooltip"
    required="ui-remote-storage.accession-workflow.error.undefined"
    {...props}
  />
);

AccessionWorkflow.propTypes = SelectField.propTypes;
