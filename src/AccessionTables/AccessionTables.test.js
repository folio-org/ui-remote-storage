import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { Provider, server, rest, mockKy, API_BASE } from '../test/net';

import { AccessionTables } from './AccessionTables';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
}));

const url = {
  configurations: {
    list: `${API_BASE}/configurations`,
  },
};

beforeEach(() => {
  server.use(
    rest.get(url.configurations.list, (req, res, ctx) => res(ctx.json({
      totalRecords: 2,
      configurations: [
        {
          id: '1',
          name: 'CAIA1',
          providerName: 'CAIA_SOFT',
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T10:08:08.216+00:00' },
        },
        {
          id: '2',
          name: 'CAIA2',
          providerName: 'CAIA_SOFT',
          url: 'http://rs2.dematic.com',
          accessionDelay: 2,
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T01:53:57.036+00:00' },
        },
      ],
    }))),
  );
});

const renderAccessionTables = () => {
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

describe('Selection', () => {
  it('displays the selection', async () => {
    renderAccessionTables();

    await screen.findByRole('button');

    const selection = screen.getByRole('button', { expanded: false });

    user.click(selection);

    expect(screen.getByRole('option', { name: 'CAIA1' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'CAIA2' })).toBeVisible();
  });
});
