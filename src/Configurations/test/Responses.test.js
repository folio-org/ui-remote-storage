import React from 'react';
import { waitFor, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';

import * as components from '@folio/stripes-acq-components';

import { mockKy, server } from '../../test/net';
import {
  mockedConfigurations, mockedProviders,
  mockedSingleConfiguration,
  renderConfigurations,
} from './setup';


jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({ width: 1920, height: 1080 }));

jest.mock('@folio/stripes-components/lib/Icon', () => props => (
  <span data-testid={props['data-testid']}>
    <svg />
    {props.children && <span>{props.children}</span>}
  </span>
));

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useShowCallout: jest.fn(),
}));

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
  useStripes: () => ({
    hasPerm: jest.fn().mockReturnValue(true),
  }),
  IfPermission: props => <>{props.children}</>,
}));


const renderSingleConfiguration = async () => {
  renderConfigurations();

  const cell = await screen.findByRole('gridcell', { name: 'RS1' });
  user.click(cell);
  await screen.findByRole('heading', { name: /details/ });
};

const renderConfigurationEdit = async () => {
  renderConfigurations('/1/edit');
};


const mockShowCallout = jest.fn();

beforeAll(async () => {
  jest.spyOn(components, 'useShowCallout').mockImplementation(() => mockShowCallout);
});

beforeEach(() => {
  mockShowCallout.mockClear();
});

describe('Fetching single configuration', () => {
  it('Does not show error callout in EditorLayer, if there are not errors', async () => {
    server.use(
      mockedProviders(),
      mockedSingleConfiguration(),
    );

    await renderConfigurationEdit();

    await screen.findByRole('button', { name: /actions/i });

    await waitFor(() => expect(mockShowCallout).not.toBeCalledWith(expect.objectContaining({ type: 'error' })));
  });

  it('shows error callout in EditorLayer, in case of server error', async () => {
    server.use(
      mockedProviders(),
      mockedSingleConfiguration(true),
    );

    await renderConfigurationEdit();

    await waitFor(() => expect(mockShowCallout).toBeCalledWith(expect.objectContaining({ type: 'error' })));
  });
});

describe('Fetching providers', () => {
  it('Does not show error callout in Providers, if there are not errors', async () => {
    server.use(
      mockedProviders(),
      mockedConfigurations(),
      mockedSingleConfiguration(),
    );

    await renderSingleConfiguration();

    const actions = await screen.findByRole('button', { name: /actions/i });
    user.click(actions);

    const edit = screen.getByRole('button', { name: /edit/i });
    user.click(edit);

    const editor = screen.getByRole('dialog', { name: /edit/ });
    expect(editor).toBeVisible();

    await within(editor).findByRole('option', { name: 'Dematic EMS' });

    await waitFor(() => expect(mockShowCallout).not.toBeCalledWith(expect.objectContaining({ type: 'error' })));
  });

  it('shows error callout in Providers, in case of server error', async () => {
    server.use(
      mockedProviders(true),
      mockedConfigurations(),
      mockedSingleConfiguration(),
    );

    await renderSingleConfiguration();

    await waitFor(() => expect(mockShowCallout).toBeCalledWith(expect.objectContaining({ type: 'error' })));
  });
});
