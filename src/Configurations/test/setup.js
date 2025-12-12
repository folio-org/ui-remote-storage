import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { render } from '@folio/jest-config-stripes/testing-library/react';

import { CONFIGURATIONS_PATH } from '../../const';
import { Configurations } from '../Configurations';
import { API_BASE, Provider, rest } from '../../test/net';

export const renderConfigurations = route => {
  const path = [CONFIGURATIONS_PATH, route].join('');

  return render(
    (
      <MemoryRouter initialEntries={[path]}>
        <IntlProvider locale="en">
          <Configurations />
        </IntlProvider>
      </MemoryRouter>
    ),
    { wrapper: Provider },
  );
};

export const ERROR_RESPONSE = (req, res, ctx) => res(ctx.status(500));

export const url = {
  providers: `${API_BASE}/providers`,
  configurations: {
    single: `${API_BASE}/configurations/1`,
    list: `${API_BASE}/configurations`,
  },
};

export const mockedProviders = ({ error } = {}) => rest.get(
  url.providers,
  error
    ? ERROR_RESPONSE
    : (req, res, ctx) => res(ctx.json([
      { id: 'DEMATIC_EMS', name: 'Dematic EMS' },
      { id: 'DEMATIC_SD', name: 'Dematic StagingDirector' },
      { id: 'CAIA_SOFT', name: 'CaiaSoft' },
    ])),
);

export const mockedConfigurations = ({ error } = {}) => rest.get(
  url.configurations.list,
  error
    ? ERROR_RESPONSE
    : (req, res, ctx) => res(ctx.json({
      totalRecords: 2,
      configurations: [
        {
          id: '1',
          name: 'RS1',
          providerName: 'DEMATIC_SD',
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T10:08:08.216+00:00' },
        },
        {
          id: '2',
          name: 'RS2',
          providerName: 'DEMATIC_EMS',
          url: 'http://rs2.dematic.com',
          accessionDelay: 2,
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T01:53:57.036+00:00' },
        },
        {
          id: '3',
          name: 'RS3',
          providerName: 'DEMATIC_EMS',
          url: 'http://rs3.caiasoft.com',
          accessionDelay: 1,
          accessionTimeUnit: 'minutes',
          metadata: { createdDat: '2021-05-28T01:53:57.036+00:00', updatedDate: '2021-05-28T10:23:53.918+00:00' },
        },
      ],
    })),
);

export const mockedSingleConfiguration = ({ error } = {}) => rest.get(
  url.configurations.single,
  error
    ? ERROR_RESPONSE
    : (req, res, ctx) => res(ctx.json({
      id: '1',
      name: 'RS1',
      providerName: 'DEMATIC_SD',
      accessionTimeUnit: 'minutes',
      metadata: { 'createdDate': '2021-05-28T10:08:08.216+00:00' },
    })),
);
