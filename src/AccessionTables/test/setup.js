import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { render } from '@testing-library/react';

import { Provider, server, rest, mockKy, API_ORIGIN, API_BASE } from '../../test/net';
import { AccessionTables } from '../AccessionTables';

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({ width: 1920, height: 1080 }));

jest.mock('@folio/stripes-components/lib/Icon', () => props => (
  <span data-testid={props['data-testid']}>
    <svg />
    {props.children && <span>{props.children}</span>}
  </span>
));

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
  useStripes: () => ({
    hasPerm: jest.fn().mockReturnValue(true),
  }),
  TitleManager: jest.fn(({ children, ...rest }) => (
    <span {...rest}>{children}</span>
  )),
}));

export const url = {
  locations: {
    list: `${API_ORIGIN}/locations`,
  },
  configurations: {
    list: `${API_BASE}/configurations`,
  },
  extendedMappingsLocations: {
    list: `${API_BASE}/extended-mappings/locations`,
  },
  mappings: {
    list: `${API_BASE}/mappings`,
  },
};

export const renderAccessionTables = () => {
  const rootReducer = combineReducers({ form: formReducer });
  const store = createStore(rootReducer);

  render(
    <MemoryRouter>
      <ReduxProvider store={store}>
        <AccessionTables />
      </ReduxProvider>
    </MemoryRouter>,
    { wrapper: Provider },
  );
};

export const ERROR_RESPONSE = (req, res, ctx) => res(ctx.status(500));

export const mockedConfigurations = ({ error } = {}) => rest.get(
  url.configurations.list,
  error
    ? ERROR_RESPONSE
    : (req, res, ctx) => res(ctx.json({
      configurations: [
        {
          id: '1',
          name: 'CaiaSoft Configuration 1',
          providerName: 'CAIA_SOFT',
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T10:08:08.216+00:00' },
        },
      ],
    })),
);

export const mockedLocations = ({ error } = {}) => rest.get(
  url.locations.list,
  error
    ? ERROR_RESPONSE
    : (req, res, ctx) => res(ctx.json({
      locations: [
        {
          id: 'L1',
          name: 'Local location 1',
        },
        {
          id: 'L2',
          name: 'Local location 2',
        },
        {
          id: 'R1',
          name: 'Remote location 2',
        },
        {
          id: 'R1',
          name: 'Remote location 2',
        },
      ],
    })),
);

export const mockedMappingsLocations = ({ error } = {}) => rest.get(
  url.extendedMappingsLocations.list,
  error
    ? ERROR_RESPONSE
    : (req, res, ctx) => res(ctx.json({
      mappings: [
        {
          finalLocationId: 'R1',
          remoteConfigurationId: '1',
          originalLocationId: 'L1',
        },
        {
          originalLocationId: 'L2',
        },
      ],
    })),
);

export const mockedMappings = ({ error } = {}) => rest.get(
  url.mappings.list,
  error
    ? ERROR_RESPONSE
    : (req, res, ctx) => res(ctx.json({
      mappings: [
        {
          configurationId: '1',
          folioLocationId: 'L1',
        },
      ],
    })),
);


beforeEach(() => {
  server.use(
    rest.get(url.configurations.list, (req, res, ctx) => res(ctx.json({
      configurations: [],
    }))),
    rest.get(url.locations.list, (req, res, ctx) => res(ctx.json({
      locations: [],
    }))),
    rest.get(url.extendedMappingsLocations.list, (req, res, ctx) => res(ctx.json({
      mappings: [],
    }))),
  );
});
