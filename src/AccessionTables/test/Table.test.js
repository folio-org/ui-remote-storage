import React from 'react';
import { screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { configure } from '@testing-library/dom';
import { byRole } from 'testing-library-selector';

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

const editButton = byRole('button', { name: /edit/ });


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

  rows.forEach(row => expect(editButton.get(row)).toBeVisible());
});

it('opens final location select on Edit button click', async () => {
  renderAccessionTables();

  const row = await screen.findByRole('row', { name: /Local location 1/ });

  user.click(editButton.get(row));

  expect(within(row).getByRole('button', { expanded: false })).toBeVisible();
});
