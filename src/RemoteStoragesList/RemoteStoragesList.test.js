import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import RemoteStoragesList from './RemoteStoragesList';

import '@folio/stripes-acq-components/test/jest/__mock__';

jest.mock('@folio/stripes-components/lib/MultiColumnList', () => {
  return jest.fn(() => 'MultiColumnList');
});

const renderRemoteStoragesList = ({
  storages = [],
  onCreateConfiguration = jest.fn(),
} = {}) => (render(
  <MemoryRouter>
    <RemoteStoragesList
      storages={storages}
      onCreateConfiguration={onCreateConfiguration}
    />
  </MemoryRouter>,
));

describe('RemoteStoragesList', () => {
  it('should render storages list', async () => {
    renderRemoteStoragesList();

    expect(screen.getByText('MultiColumnList')).toBeDefined();
  });

  it('should call onCreateConfiguration when new buttom clicked', async () => {
    const onCreateConfiguration = jest.fn();

    renderRemoteStoragesList({ onCreateConfiguration });

    user.click(screen.getByTestId('new-remote-storage'));

    await waitFor(() => expect(onCreateConfiguration).toHaveBeenCalled());
  });
});
