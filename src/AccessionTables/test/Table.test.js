import React from 'react';
import { screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { byRole } from 'testing-library-selector';

import { server, rest } from '../../test/net';
import { url, renderAccessionTables } from './setup';

beforeEach(() => {
  server.use(
    rest.get(url.configurations.list, (req, res, ctx) => res(ctx.json({
      configurations: [
        {
          id: '1',
          name: 'CaiaSoft Configuration 1',
          providerName: 'CAIA_SOFT',
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T10:08:08.216+00:00' },
        },
      ],
    }))),

    rest.get(url.locations.list, (req, res, ctx) => res(ctx.json({
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
    }))),

    rest.get(url.extendedMappingsLocations.list, (req, res, ctx) => res(ctx.json({
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
    }))),
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
