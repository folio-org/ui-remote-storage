import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import RemoteStorageDetailsContainer from './RemoteStorageDetailsContainer';
import RemoteStorageDetails from './RemoteStorageDetails';

jest.mock('./RemoteStorageDetails', () => {
  return jest.fn(() => 'RemoteStorageDetails');
});

const renderRemoteStorageDetailsContainer = ({
  mutator = {},
} = {}) => (render(
  <MemoryRouter>
    <RemoteStorageDetailsContainer
      mutator={mutator}
    />
  </MemoryRouter>,
));

describe('RemoteStorageDetailsContainer', () => {
  let mutator;

  beforeEach(() => {
    RemoteStorageDetails.mockClear();

    mutator = {
      configurations: {
        GET: jest.fn(() => Promise.resolve({})),
        DELETE: jest.fn(() => Promise.resolve()),
      },
      mappings: {
        GET: jest.fn(() => Promise.resolve({ mappings: [] })),
      },
    };
  });

  it('should fetch configurations', async () => {
    renderRemoteStorageDetailsContainer({ mutator });

    await waitFor(() => expect(mutator.configurations.GET).toHaveBeenCalled());
  });

  it('should render Remote Storage Details', async () => {
    renderRemoteStorageDetailsContainer({ mutator });

    await waitFor(() => expect(screen.getByText('RemoteStorageDetails')).toBeVisible());
  });

  describe('Remove RS', () => {
    it('should fetch mappings', async () => {
      renderRemoteStorageDetailsContainer({ mutator });

      RemoteStorageDetails.mock.calls[0][0].onRemovestorage();
      await waitFor(() => expect(mutator.mappings.GET).toHaveBeenCalled());
    });

    it('should open remove confirmation modal', async () => {
      renderRemoteStorageDetailsContainer({ mutator });

      RemoteStorageDetails.mock.calls[0][0].onRemovestorage();
      await waitFor(() => expect(screen.getByText('ui-remote-storage.removingModal.message')).toBeDefined());
    });

    it('should call DELETE configuration', async () => {
      renderRemoteStorageDetailsContainer({ mutator });

      RemoteStorageDetails.mock.calls[0][0].onRemovestorage();
      const confirmationModalButton = await screen.findByText('ui-remote-storage.delete');

      user.click(confirmationModalButton);

      await waitFor(() => expect(mutator.configurations.DELETE).toHaveBeenCalled());
    });
  });
});
