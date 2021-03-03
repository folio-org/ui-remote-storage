import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act, screen, waitFor } from '@testing-library/react';
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

  beforeEach(async () => {
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

    await act(async () => {
      renderRemoteStorageDetailsContainer({ mutator });
    });
  });

  it('should fetch configurations', async () => {
    expect(mutator.configurations.GET).toHaveBeenCalled();
  });

  it('should render Remote Storage Details', async () => {
    expect(screen.getByText('RemoteStorageDetails')).toBeDefined();
  });

  describe('Remove RS', () => {
    it('should fetch mappings', async () => {
      await waitFor(() => {
        RemoteStorageDetails.mock.calls[0][0].onRemovestorage();
      });

      expect(mutator.mappings.GET).toHaveBeenCalled();
    });

    it('should open remove confirmation modal', async () => {
      await waitFor(() => {
        RemoteStorageDetails.mock.calls[0][0].onRemovestorage();
      });

      expect(screen.getByText('ui-remote-storage.removingModal.message')).toBeDefined();
    });

    it('should call DELETE configuration', async () => {
      await waitFor(async () => {
        RemoteStorageDetails.mock.calls[0][0].onRemovestorage();
        user.click(screen.getByText('ui-remote-storage.confirmationModal.save'));
      });

      expect(mutator.configurations.DELETE).toHaveBeenCalled();
    });
  });
});
