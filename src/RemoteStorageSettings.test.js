import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { CONFIGURATIONS_PATH } from './const';
import RemoteStorageSettings from './RemoteStorageSettings';

// jest.mock('@folio/stripes-core', () => ({
//   ...jest.requireActual('@folio/stripes/core'),
//   withStripes: Component => Component,
//   stripesConnect: Component => props => <Component {...props} />,
// }));

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

jest.mock('./Configurations', () => <>Configurations</>);

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
