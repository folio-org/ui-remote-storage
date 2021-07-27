import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { configure } from '@testing-library/dom';

import * as components from '@folio/stripes-acq-components';

import { byRole } from 'testing-library-selector';
import { mockKy, server } from '../../test/net';
import {
  renderAccessionTables,
  mockedConfigurations,
  mockedLocations,
  mockedMappings,
  mockedMappingsLocations,
} from './setup';


configure({ asyncUtilTimeout: 2000 });

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({ width: 1920, height: 1080 }));

jest.mock('@folio/stripes-components/lib/Icon', () => props => (
  <span data-testid={props['data-testid']}>
    <svg />
    {props.children && <span>{props.children}</span>}
  </span>
));

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useShowCallout: jest.fn(),
}));

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
  useStripes: () => ({
    hasPerm: jest.fn().mockReturnValue(true),
  }),
}));


const mockShowCallout = jest.fn();

beforeEach(() => {
  server.use(
    mockedConfigurations(),
    mockedLocations(),
    mockedMappings(),
    mockedMappingsLocations(),
  );

  mockShowCallout.mockClear();
});

beforeAll(async () => {
  jest.spyOn(components, 'useShowCallout').mockImplementation(() => mockShowCallout);
});

const editButton = byRole('button', { name: /edit/ });

const renderAccessionTablesWithError = async () => {
  renderAccessionTables();

  await waitFor(() => {
    expect(screen.getByText('ui-remote-storage.error')).toBeInTheDocument();
  });
};

describe('Fetching locations', () => {
  it('shows error text in Table, in case of server error', async () => {
    server.use(mockedLocations({ error: true }));

    await renderAccessionTablesWithError();
  });
});

describe('Fetching mappings location', () => {
  it('shows error text in Table, in case of server error', async () => {
    server.use(mockedMappingsLocations({ error: true }));

    await renderAccessionTablesWithError();
  });
});

describe('Fetching mappings', () => {
  it('shows error callout in LocationField, in case of server error', async () => {
    server.use(mockedMappings({ error: true }));

    renderAccessionTables();

    const row = await screen.findByRole('row', { name: /Local location 1/ });

    user.click(editButton.get(row));

    expect(within(row).getByRole('button', { expanded: false })).toBeVisible();

    await waitFor(() => expect(mockShowCallout).toBeCalledWith(expect.objectContaining({ type: 'error' })));
  });
});
