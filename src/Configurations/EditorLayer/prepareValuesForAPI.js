import { DEMATIC_SD, CAIASOFT } from '../../const';

export const prepareValuesForAPI = formValues => {
  const values = {
    accessionTimeUnit: 'minutes', // The endpoint breaks if accessionTimeUnit is empty
    ...formValues,
  };

  if (values.providerName !== DEMATIC_SD) {
    delete values.statusUrl;
    delete values.accessionDelay;
  }

  if (values.providerName !== CAIASOFT) {
    delete values.apiKey;
    delete values.accessionWorkflowDetails;
    delete values.returningWorkflowDetails;
  }

  return values;
};
