import React from 'react';
import { screen } from '@testing-library/react';
// import user from '@testing-library/user-event';

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
          // code: 'KU/CC/DI/A',
          // isActive: true,
          // institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
          // campusId: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
          // libraryId: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
          // primaryServicePoint: '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
          // servicePointIds: [
          //   '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
          // ],
          // servicePoints: [],
          // metadata: {
          //   createdDate: '2021-06-11T03:22:07.792+00:00',
          //   updatedDate: '2021-06-11T03:22:07.792+00:00',
          // },
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

  expect(screen.getAllByRole('row').length).toBe(1 + 2); // 1 header row + 2 data rows

  expect(screen.getByRole('row', { name: /Local location 1/ })).toBeVisible();
  expect(screen.getByRole('row', { name: /Local location 2/ })).toBeVisible();
});
