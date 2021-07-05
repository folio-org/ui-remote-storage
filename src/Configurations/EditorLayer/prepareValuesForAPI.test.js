import { DEMATIC_SD, DEMATIC_EMS, CAIASOFT } from '../../const';
import { prepareValuesForAPI } from './prepareValuesForAPI';

const allValues = {
  providerName: 'providerName',
  name: 'name',
  url: 'https://url.com',
  statusUrl: 'https://status.url.com',
  apiKey: 'apiKey',
  accessionWorkflowDetails: 'accessionWorkflowDetails',
  returningWorkflowDetails: 'returningWorkflowDetails',
  accessionDelay: '42',
  accessionTimeUnit: 'minutes',
};


test('DEMATIC_SD', () => {
  const formValues = {
    ...allValues,
    providerName: DEMATIC_SD,
  };

  const resultValues = {
    providerName: DEMATIC_SD,
    name: 'name',
    url: 'https://url.com',
    statusUrl: 'https://status.url.com',
    accessionDelay: '42',
    accessionTimeUnit: 'minutes',
  };

  expect(prepareValuesForAPI(formValues)).toEqual(resultValues);
});

test('DEMATIC_EMS', () => {
  const formValues = {
    ...allValues,
    providerName: DEMATIC_EMS,
  };

  const resultValues = {
    providerName: DEMATIC_EMS,
    name: 'name',
    url: 'https://url.com',
    accessionTimeUnit: 'minutes',
  };

  expect(prepareValuesForAPI(formValues)).toEqual(resultValues);
});

test('CAIASOFT', () => {
  const formValues = {
    ...allValues,
    providerName: CAIASOFT,
  };

  const resultValues = {
    providerName: CAIASOFT,
    name: 'name',
    url: 'https://url.com',
    apiKey: 'apiKey',
    accessionWorkflowDetails: 'accessionWorkflowDetails',
    returningWorkflowDetails: 'returningWorkflowDetails',
    accessionTimeUnit: 'minutes',
  };

  expect(prepareValuesForAPI(formValues)).toEqual(resultValues);
});

test('accessionTimeUnit is always there', () => {
  const formValues = {};

  const resultValues = {
    accessionTimeUnit: 'minutes',
  };

  expect(prepareValuesForAPI(formValues)).toEqual(resultValues);
});
