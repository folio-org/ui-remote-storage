import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { queryHelpers } from '@testing-library/dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import RemoteStorageDetails from './RemoteStorageDetails';

import '@folio/stripes-acq-components/test/jest/__mock__';

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const renderRemoteStorageDetails = ({
  storage = {},
  onRemovestorage = jest.fn(),
} = {}) => (render(
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>
      <RemoteStorageDetails
        storage={storage}
        onRemovestorage={onRemovestorage}
      />
    </MemoryRouter>
  </QueryClientProvider>,
));

describe('RemoteStorageDetails', () => {
  it('should display storage details', () => {
    const { getByTestId } = renderRemoteStorageDetails();

    expect(getByTestId('storage-details-pane')).toBeDefined();
  });

  describe('Sections toggle', () => {
    it('should collapse sections when Collapse all button is pressed', () => {
      const { getByText, container } = renderRemoteStorageDetails();

      user.click(getByText('stripes-components.collapseAll'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });

    it('should collapse signle section when section title is pressed', () => {
      const { getByText, container } = renderRemoteStorageDetails();

      user.click(getByText('stripes-components.collapseAll'));
      user.click(getByText('ui-remote-storage.details.title'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length - 1);
    });
  });
});
