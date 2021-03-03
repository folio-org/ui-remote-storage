import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import RemoteStorageForm from './RemoteStorageForm';

jest.mock('@folio/stripes-components/lib/Layer', () => {
  // eslint-disable-next-line react/prop-types
  return ({ children }) => (
    <>{children}</>
  );
});

const renderRemoteStorageForm = ({
  initialValues,
  providers = [{ label: 'DEMATIC_SD' }],
  onSubmit = jest.fn(),
  onClose = jest.fn(),
  pristine = true,
  submitting = false,
} = {}) => (render(
  <MemoryRouter>
    <RemoteStorageForm
      initialValues={initialValues}
      providers={providers}
      onSubmit={onSubmit}
      onClose={onClose}
      pristine={pristine}
      submitting={submitting}
    />
  </MemoryRouter>,
));

describe('RemoteStorageForm', () => {
  it('should open create form if no initialValues', async () => {
    await act(async () => {
      renderRemoteStorageForm();
    });

    expect(screen.getByText('ui-remote-storage.createForm.title')).toBeDefined();
  });

  it('should open create form if initialValues exist', async () => {
    await act(async () => {
      renderRemoteStorageForm({ initialValues: {} });
    });

    expect(screen.getByText('ui-remote-storage.editForm.title')).toBeDefined();
  });

  it('should show Status URL if Dematic SD choosed', async () => {
    await act(async () => {
      renderRemoteStorageForm({ initialValues: {} });
    });

    await waitFor(() => {
      user.selectOptions(screen.getByLabelText('ui-remote-storage.details.providerName'), 'DEMATIC_SD');
    });

    expect(screen.getByLabelText('ui-remote-storage.details.statusUrl')).toBeDefined();
  });
});
