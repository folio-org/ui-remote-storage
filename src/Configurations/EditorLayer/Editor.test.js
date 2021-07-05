import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Editor } from './Editor';

import {
  DEMATIC_SD,
  DEMATIC_EMS,
  CAIASOFT,
} from '../../const';

const mockProvidersOptions = [
  { label: DEMATIC_EMS },
  { label: DEMATIC_SD },
  { label: CAIASOFT },
];

jest.mock(
  '../Fields/Sections/General/useProvidersOptions',
  () => ({
    useProvidersOptions: () => ({ options: mockProvidersOptions }),
  }),
);

jest.mock(
  '@folio/stripes-components/lib/Layer',
  () => props => props.children,
);

const renderRemoteStorageForm = ({
  title = 'title',
  initialValues,
  onSubmit = jest.fn(),
  onClose = jest.fn(),
  pristine = true,
  submitting = false,
} = {}) => render(
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>
      <Editor
        title={title}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onClose={onClose}
        pristine={pristine}
        submitting={submitting}
      />
    </MemoryRouter>
  </QueryClientProvider>,
);

describe('Editor', () => {
  it('shows Dematic SD specific fields if Dematic SD chosen', () => {
    renderRemoteStorageForm();

    const providers = screen.getByRole('combobox', { name: 'ui-remote-storage.details.providerName' });
    const dematicSdOption = within(providers).getByRole('option', { name: DEMATIC_SD });
    const otherOptions = within(providers).getAllByRole('option', { name: text => text !== DEMATIC_SD });

    user.selectOptions(providers, dematicSdOption);
    expect(screen.getByRole('textbox', { name: /statusUrl/ })).toBeVisible();
    expect(screen.getByRole('region', { name: /synchronization/ })).toBeVisible();

    otherOptions.forEach(option => {
      if (option.disabled) return; // for the 'Select' placeholder

      user.selectOptions(providers, option);
      expect(screen.queryByRole('textbox', { name: /statusUrl/ })).not.toBeInTheDocument();
      expect(screen.queryByRole('region', { name: /synchronization/ })).not.toBeInTheDocument();
    });
  });

  it('shows CaiaSoft specific fields if CaiaSoft is chosen', () => {
    const query = {
      get credProperties() {
        return screen.queryByLabelText('ui-remote-storage.details.credProperties');
      },
      get accessionWorkflowSection() {
        return screen.queryByRole('region', { name: /ui-remote-storage.accession-workflow.title/ });
      },
      get returningWorkflowSection() {
        return screen.queryByRole('region', { name: /ui-remote-storage.returning-workflow.title/ });
      },
    };

    renderRemoteStorageForm();

    const providers = screen.getByRole('combobox', { name: 'ui-remote-storage.details.providerName' });
    const ciasoftOption = within(providers).getByRole('option', { name: CAIASOFT });
    const otherOptions = within(providers).getAllByRole('option', { name: text => text !== CAIASOFT });

    user.selectOptions(providers, ciasoftOption);

    expect(query.credProperties).toBeVisible();

    expect(query.accessionWorkflowSection).toBeVisible();
    expect(within(query.accessionWorkflowSection).getByRole('combobox')).toBeVisible();

    expect(query.returningWorkflowSection).toBeVisible();
    expect(within(query.returningWorkflowSection).getByRole('combobox')).toBeVisible();

    otherOptions.forEach(option => {
      if (option.disabled) return; // for the 'Select' placeholder

      user.selectOptions(providers, option);
      expect(query.credProperties).not.toBeInTheDocument();
      expect(query.accessionWorkflowSection).not.toBeInTheDocument();
      expect(query.returningWorkflowSection).not.toBeInTheDocument();
    });
  });
});
