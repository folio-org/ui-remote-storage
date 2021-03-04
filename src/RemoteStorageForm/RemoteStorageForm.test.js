import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import RemoteStorageForm from './RemoteStorageForm';

jest.mock(
  '@folio/stripes-components/lib/Layer',
  () => props => props.children,
);

const renderRemoteStorageForm = ({
  initialValues,
  providers = [],
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
  it('should open create form if no initialValues', () => {
    renderRemoteStorageForm();

    expect(screen.getByText('ui-remote-storage.createForm.title')).toBeVisible();
  });

  it('should open create form if initialValues exist', () => {
    renderRemoteStorageForm({ initialValues: {} });

    expect(screen.getByText('ui-remote-storage.editForm.title')).toBeVisible();
  });

  it('should show Status URL if Dematic SD chosen', () => {
    renderRemoteStorageForm({
      initialValues: {},
      providers: [{ label: 'DEMATIC_SD' }, { label: 'DEMATIC_EMS' }],
    });

    user.selectOptions(screen.getByLabelText('ui-remote-storage.details.providerName'), 'DEMATIC_SD');
    expect(screen.queryByLabelText('ui-remote-storage.details.statusUrl')).toBeVisible();

    user.selectOptions(screen.getByLabelText('ui-remote-storage.details.providerName'), 'DEMATIC_EMS');
    expect(screen.queryByLabelText('ui-remote-storage.details.statusUrl')).not.toBeInTheDocument();
  });
});
