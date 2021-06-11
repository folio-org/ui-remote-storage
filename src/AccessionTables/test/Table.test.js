import React from 'react';
import { screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';

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


it('has a row for every local location', async () => {
  renderAccessionTables();

  await screen.findByRole('grid');

  expect(await screen.findByRole('row', { name: /Local location 1/ })).toBeVisible();
  expect(await screen.findByRole('row', { name: /Local location 2/ })).toBeVisible();

  expect(screen.getAllByRole('row').length).toBe(1 + 2); // 1 header row + 2 data rows
});

it('opens final location select for row', async () => {
  renderAccessionTables();

  await screen.findByRole('grid');

  const firstRow = screen.getAllByRole('row')[1];
  const editButton = within(firstRow).getByRole('button');
  user.click(editButton);

  expect(within(firstRow).getByRole('button', { expanded: false })).toBeVisible();
});
