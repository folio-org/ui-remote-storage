import React from 'react';
import { screen } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';

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
        {
          id: '2',
          name: 'CaiaSoft Configuration 2',
          providerName: 'CAIA_SOFT',
          url: 'http://rs2.dematic.com',
          accessionDelay: 2,
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T01:53:57.036+00:00' },
        },
        {
          id: '3',
          name: 'Dematic SD Configuration',
          providerName: 'DEMATIC_SD',
          url: 'http://rs2.dematic.com',
          accessionDelay: 2,
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T01:53:57.036+00:00' },
        },
        {
          id: '4',
          name: 'Dematic EMS Configuration',
          providerName: 'DEMATIC_EMS',
          url: 'http://rs2.dematic.com',
          accessionDelay: 2,
          accessionTimeUnit: 'minutes',
          metadata: { 'createdDate': '2021-05-28T01:53:57.036+00:00' },
        },
      ],
    }))),
  );
});


it('has only CaiaSoft options', async () => {
  renderAccessionTables();

  await screen.findByRole('button');

  const selection = screen.getByRole('button', { expanded: false });

  await user.click(selection);

  expect(screen.getByRole('option', { name: 'CaiaSoft Configuration 1' })).toBeVisible();
  expect(screen.getByRole('option', { name: 'CaiaSoft Configuration 2' })).toBeVisible();
  expect(screen.queryByRole('option', { name: 'Dematic SD Configuration' })).not.toBeInTheDocument();
  expect(screen.queryByRole('option', { name: 'Dematic EMS Configuration' })).not.toBeInTheDocument();
});

// this test is skipped and will be taken up in the scope of a tech debt
// https://folio-org.atlassian.net/browse/UIRS-119
it.skip('filters the options', async () => {
  renderAccessionTables();

  await screen.findByRole('button');

  const selection = screen.getByRole('button', { expanded: false });

  user.click(selection);

  expect(screen.getByRole('option', { name: /1/ })).toBeVisible();
  expect(screen.getByRole('option', { name: /2/ })).toBeVisible();

  user.type(screen.getByRole('combobox', { name: /selection/i }), '1');

  expect(screen.getByRole('option', { name: /1/ })).toBeVisible();
  expect(screen.queryByRole('option', { name: /2/ })).not.toBeInTheDocument();
});
