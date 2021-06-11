import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { render } from '@testing-library/react';

import { Provider, server, rest, mockKy, API_ORIGIN, API_BASE } from '../../test/net';
import { AccessionTables } from '../AccessionTables';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
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
