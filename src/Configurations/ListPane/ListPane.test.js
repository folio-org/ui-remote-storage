import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';

import { List } from './List';

import '@folio/stripes-acq-components/test/jest/__mock__';

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({ height: 600, width: 600 }));
let mockQueryResult = {};

jest.mock('../../API/Configurations', () => ({
  useListQuery: () => mockQueryResult,
}));

const queryClient = new QueryClient();

const Wrapper = ({ children }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </MemoryRouter>
);

const renderRemoteStoragesList = () => render(<List />, { wrapper: Wrapper });

describe('List', () => {
  it('is shown', () => {
    mockQueryResult = {
      configurations: [
        {
          id: '0',
          name: 'first',
          providerName: 'DEMATIC_EMS',
          'metadata': {
            'createdDate': '2021-05-18T01:53:52.876+00:00',
          },
        },
        {
          id: '1',
          name: 'second',
          providerName: 'CAIA_SOFT',
          'metadata': {
            'createdDate': '2021-05-18T07:40:41.934+00:00',
            'updatedDate': '2021-05-18T08:10:42.948+00:00',
          },
        },
      ],
    };

    renderRemoteStoragesList();

    expect(screen.getByRole('grid')).toBeVisible();
  });
});
