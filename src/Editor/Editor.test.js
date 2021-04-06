import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, getAllByRole, getByRole } from '@testing-library/react';
import user from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

import Editor from './Editor';

import {
  DEMATIC_SD,
  DEMATIC_EMS,
  CAIASOFT,
} from '../const';

const mockProvidersOptions = [
  { label: DEMATIC_EMS },
  { label: DEMATIC_SD },
  { label: CAIASOFT },
];

jest.mock(
  '../Details/Sections/General/useProvidersOptions',
  () => ({
    useProvidersOptions: () => mockProvidersOptions,
  }),
);

jest.mock(
  '@folio/stripes-components/lib/Layer',
  () => props => props.children,
);

const renderRemoteStorageForm = ({
  initialValues,
  onSubmit = jest.fn(),
  onClose = jest.fn(),
  pristine = true,
  submitting = false,
} = {}) => (render(
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>
      <Editor
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
  it('should open create form if no initialValues', () => {
    renderRemoteStorageForm();

    expect(screen.getByText('ui-remote-storage.createForm.title')).toBeVisible();
  });

  it('should open create form if initialValues exist', () => {
    renderRemoteStorageForm({ initialValues: {} });

    expect(screen.getByText('ui-remote-storage.editForm.title')).toBeVisible();
  });

  it('should show Status URL if Dematic SD chosen', () => {
    renderRemoteStorageForm();

    const providers = screen.getByRole('combobox', { name: 'ui-remote-storage.details.providerName' });
    const dematicSdOption = getByRole(providers, 'option', { name: DEMATIC_SD });
    const otherOptions = getAllByRole(providers, 'option', { name: text => text !== DEMATIC_SD });

    user.selectOptions(providers, dematicSdOption);
    expect(screen.queryByLabelText('ui-remote-storage.details.statusUrl')).toBeVisible();

    otherOptions.forEach(option => {
      user.selectOptions(providers, option);
      expect(screen.queryByLabelText('ui-remote-storage.details.statusUrl')).not.toBeInTheDocument();
    });
  });

  it('should show Credential properties if Caiasoft is chosen', () => {
    renderRemoteStorageForm();

    const providers = screen.getByRole('combobox', { name: 'ui-remote-storage.details.providerName' });
    const ciasoftOption = getByRole(providers, 'option', { name: CAIASOFT });
    const otherOptions = getAllByRole(providers, 'option', { name: text => text !== CAIASOFT });

    user.selectOptions(providers, ciasoftOption);
    expect(screen.queryByLabelText('ui-remote-storage.details.credProperties')).toBeVisible();

    otherOptions.forEach(option => {
      user.selectOptions(providers, option);
      expect(screen.queryByLabelText('ui-remote-storage.details.credProperties')).not.toBeInTheDocument();
    });
  });
});
