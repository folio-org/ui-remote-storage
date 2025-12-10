import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import RemoteStorageSettings from './RemoteStorageSettings';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  TitleManager: jest.fn(({ children, ...rest }) => (
    <span {...rest}>{children}</span>
  )),
}));

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
      <IntlProvider locale="en">
        <RemoteStorageSettings />
      </IntlProvider>
    </MemoryRouter>,
  )
);

describe('RemoteStorageSettings', () => {
  it('displays Configurations section link', () => {
    renderRemoteStorageSettings();

    expect(screen.getByRole('link', { name: /Configurations/i })).toBeVisible();
  });
});
