import React from 'react';
import { screen, within } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { configure } from '@folio/jest-config-stripes/testing-library/dom';

import { server } from '../../test/net';
import {
  renderAccessionTables,
  mockedConfigurations,
  mockedLocations,
  mockedMappingsLocations,
} from './setup';

configure({ asyncUtilTimeout: 2000 });

beforeEach(() => {
  server.use(
    mockedConfigurations(),
    mockedLocations(),
    mockedMappingsLocations(),
  );
});


it('has a row for every local location', async () => {
  renderAccessionTables();

  await screen.findByRole('grid');

  expect(await screen.findByRole('row', { name: /Local location 1/ })).toBeVisible();
  expect(await screen.findByRole('row', { name: /Local location 2/ })).toBeVisible();

  expect(screen.getAllByRole('row').length).toBe(1 + 2); // 1 header row + 2 data rows
});

it('has Edit button in every row', async () => {
  renderAccessionTables();

  const rows = await screen.findAllByRole('row', { name: /Local location/ });

  rows.forEach(row => expect(within(row).getByRole('button', { name: /edit/ })).toBeVisible());
});

it('opens final location select on Edit button click', async () => {
  renderAccessionTables();

  const row = await screen.findByRole('row', { name: /Local location 1/ });

  await user.click(within(row).getByRole('button', { name: /edit/ }));

  expect(within(row).getByRole('button', { expanded: false })).toBeVisible();
});
