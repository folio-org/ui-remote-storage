import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import Editor from './Editor';

import {
  DEMATIC_SD,
  DEMATIC_EMS,
  CAIASOFT,
} from '../const';

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
    <Editor
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
      providers: [{ label: DEMATIC_SD }, { label: DEMATIC_EMS }],
    });

    user.selectOptions(screen.getByLabelText('ui-remote-storage.details.providerName'), DEMATIC_SD);
    expect(screen.queryByLabelText('ui-remote-storage.details.statusUrl')).toBeVisible();

    user.selectOptions(screen.getByLabelText('ui-remote-storage.details.providerName'), DEMATIC_EMS);
    expect(screen.queryByLabelText('ui-remote-storage.details.statusUrl')).not.toBeInTheDocument();
  });

  it('should show Credential properties if Caiasoft is chosen', () => {
    renderRemoteStorageForm({
      initialValues: {},
      providers: [{ label: DEMATIC_SD }, { label: CAIASOFT }],
    });

    user.selectOptions(screen.getByLabelText('ui-remote-storage.details.providerName'), CAIASOFT);
    expect(screen.queryByLabelText('ui-remote-storage.details.credProperties')).toBeVisible();

    user.selectOptions(screen.getByLabelText('ui-remote-storage.details.providerName'), DEMATIC_SD);
    expect(screen.queryByLabelText('ui-remote-storage.details.credProperties')).not.toBeInTheDocument();
  });
});