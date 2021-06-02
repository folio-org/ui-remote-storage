import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import RemoteStorageSettings from './RemoteStorageSettings';

jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  Settings: jest.fn(({
    pages,
    paneTitle,
  }) => (
    <>
      <span>{paneTitle}</span>
      <a href={`/settings/remote-storage/${pages[0].route}`}>{pages[0].route}</a>
    </>
  )),
}));

const renderRemoteStorageSettings = () => (
  render(
    <MemoryRouter>
      <RemoteStorageSettings />
    </MemoryRouter>,
  )
);

describe('RemoteStorageSettings', () => {
  it('shoul open Remote storage settings', () => {
    renderRemoteStorageSettings();

    expect(screen.getByRole('link', { name: /Configurations/i })).toBeVisible();
  });
});
