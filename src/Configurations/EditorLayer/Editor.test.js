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
} = {}) => (render(
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
));

describe('Editor', () => {
  it('should show Status URL if Dematic SD chosen', () => {
    renderRemoteStorageForm();

    const providers = screen.getByRole('combobox', { name: 'ui-remote-storage.details.providerName' });
    const dematicSdOption = within(providers).getByRole('option', { name: DEMATIC_SD });
    const otherOptions = within(providers).getAllByRole('option', { name: text => text !== DEMATIC_SD });

    user.selectOptions(providers, dematicSdOption);
    expect(screen.queryByLabelText('ui-remote-storage.details.statusUrl')).toBeVisible();

    otherOptions.forEach(option => {
      if (option.disabled) return; // for the 'Select' placeholder

      user.selectOptions(providers, option);
      expect(screen.queryByLabelText('ui-remote-storage.details.statusUrl')).not.toBeInTheDocument();
    });
  });

  it('should show CaiaSoft-specific fields if CaiaSoft is chosen', () => {
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

  describe('Data synchronization schedule delay', () => {
    const validValues = ['1', '2', String(Number.MAX_SAFE_INTEGER)];
    const invalidValues = ['0', '-1', '3.14', '.2', '-0.2', 'abc'];

    it.each(validValues)('shows no error when valid', value => {
      renderRemoteStorageForm();

      const region = screen.getByRole('region', { name: /synchronization/ });
      const input = within(region).getByRole('spinbutton');

      user.type(input, value);
      user.tab();

      expect(region).not.toHaveTextContent(/synchronization.schedule.info.notValid/);
    });

    it.each(invalidValues)('shows error message when not valid', value => {
      renderRemoteStorageForm();

      const region = screen.getByRole('region', { name: /synchronization/ });
      const input = within(region).getByRole('spinbutton');

      user.type(input, value);
      user.tab();

      const alert = within(region).getAllByRole('alert')[0];
      expect(alert).toHaveTextContent(/synchronization.schedule.info.notValid/);
    });
  });
});
