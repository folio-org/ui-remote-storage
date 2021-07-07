import { DEMATIC_SD, CAIASOFT } from '../../const';

export const prepareValuesForAPI = formValues => {
  const values = { ...formValues };

  if (values.providerName !== DEMATIC_SD) {
    delete values.statusUrl;
    delete values.accessionDelay;
    delete values.accessionTimeUnit;
  }

  if (values.providerName !== CAIASOFT) {
    delete values.apiKey;
    delete values.accessionWorkflowDetails;
    delete values.returningWorkflowDetails;
  }

  return values;
};
