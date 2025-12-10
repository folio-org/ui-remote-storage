import { act } from 'react';
import { screen, waitFor, within } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';

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
    okapi: { url: 'http://localhost:9130', tenant: 'diku' },
  }),
  IfPermission: props => <>{props.children}</>,
  TitleManager: jest.fn(({ children, ...rest }) => (
    <span {...rest}>{children}</span>
  )),
}));


const renderSingleConfiguration = async () => {
  renderConfigurations();

  const cell = await screen.findByRole('gridcell', { name: 'RS1' });
  await act(async () => {
    await user.click(cell);
  });
  await screen.findByRole('heading', { name: /details/ });
};

const renderConfigurationEdit = () => {
  renderConfigurations('/1/edit');
};


const mockShowCallout = jest.fn();

beforeAll(async () => {
  jest.spyOn(components, 'useShowCallout').mockImplementation(() => mockShowCallout);
});

beforeEach(() => {
  server.use(
    mockedConfigurations(),
    mockedProviders(),
    mockedSingleConfiguration(),
  );

  mockShowCallout.mockClear();
});

describe('Fetching single configuration', () => {
  it('does not show error callout in EditorLayer, if there are not errors', async () => {
    await renderConfigurationEdit();

    await screen.findByRole('button', { name: /actions/i });

    expect(mockShowCallout).not.toBeCalledWith(expect.objectContaining({ type: 'error' }));
  });

  it('shows error callout in EditorLayer, in case of server error', async () => {
    server.use(mockedSingleConfiguration({ error: true }));

    await renderConfigurationEdit();

    await waitFor(() => expect(mockShowCallout).toBeCalledWith(expect.objectContaining({ type: 'error' })));
  });
});

describe('Fetching providers', () => {
  it('does not show error callout in Providers, if there are not errors', async () => {
    await renderSingleConfiguration();

    const details = screen.getByRole('region', { name: /details/ });

    await within(details).findByText(/dematic/i);

    expect(mockShowCallout).not.toBeCalledWith(expect.objectContaining({ type: 'error' }));
  });

  it('shows error callout in Providers, in case of server error', async () => {
    server.use(mockedProviders({ error: true }));

    await renderSingleConfiguration();

    await waitFor(() => expect(mockShowCallout).toBeCalledWith(expect.objectContaining({ type: 'error' })));
  });
});
