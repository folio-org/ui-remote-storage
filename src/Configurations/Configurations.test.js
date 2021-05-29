import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { noop } from 'lodash';
import 'cross-fetch/polyfill'; // for Ky using `fetch`
import mockKy from 'ky';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { Configurations } from './Configurations';

import { CONFIGURATIONS_PATH } from '../const';


jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({ width: 1920, height: 1080 }));

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy.create({ prefixUrl: 'http://test/' }),
  useStripes: () => ({
    hasPerm: jest.fn().mockReturnValue(true),
    locale: 'en-US',
  }),
  IfPermission: props => <>{props.children}</>,
}));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = props => <QueryClientProvider client={queryClient} {...props} />;

const id = 1;
const url = {
  providers: 'http://test/remote-storage/providers',
  configurations: {
    single: `http://test/remote-storage/configurations/${id}`,
    list: 'http://test/remote-storage/configurations',
  },
};

export const server = setupServer(
  rest.get(url.providers, (req, res, ctx) => res(ctx.json([
    { id: 'DEMATIC_EMS', name: 'Dematic EMS' },
    { id: 'DEMATIC_SD', name: 'Dematic StagingDirector' },
    { id: 'CAIA_SOFT', name: 'CaiaSoft' },
  ]))),

  rest.get(url.configurations.list, (req, res, ctx) => res(ctx.json({
    totalRecords: 2,
    configurations: [
      {
        id: '1',
        name: 'RS1',
        providerName: 'DEMATIC_SD',
        accessionTimeUnit: 'minutes',
        metadata: { 'createdDate': '2021-05-28T10:08:08.216+00:00' },
      },
      {
        id: '2',
        name: 'RS2',
        providerName: 'DEMATIC_EMS',
        url: 'http://rs2.dematic.com',
        accessionDelay: 2,
        accessionTimeUnit: 'minutes',
        metadata: { 'createdDate': '2021-05-28T01:53:57.036+00:00' },
      },
      {
        id: '3',
        name: 'RS3',
        providerName: 'DEMATIC_EMS',
        url: 'http://rs3.caiasoft.com',
        accessionDelay: 1,
        accessionTimeUnit: 'minutes',
        metadata: { createdDat: '2021-05-28T01:53:57.036+00:00', updatedDate: '2021-05-28T10:23:53.918+00:00' },
      },
    ],
  }))),

  rest.get(url.configurations.single, (req, res, ctx) => res(ctx.json({
    id: '1',
    name: 'RS1',
    providerName: 'DEMATIC_SD',
    accessionTimeUnit: 'minutes',
    metadata: { 'createdDate': '2021-05-28T10:08:08.216+00:00' },
  }))),

  rest.get(url.configurations.single, (req, res, ctx) => res(ctx.json({
    field1: 'field1',
    field2: 'field2',
  }))),
);


beforeAll(() => {
  // establish API mocking before all tests
  server.listen({
    onUnhandledRequest: 'warn',
  });

  // We don't want react-query errors in console
  // when testing the "server error" cases
  setLogger({
    log: noop,
    warn: noop,
    error: noop,
  });
});

afterEach(() => {
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  server.resetHandlers();

  // reset the react-query client state
  queryClient.clear();
});

// clean up once the tests are done
afterAll(() => server.close());


const renderConfigurations = route => {
  const path = [CONFIGURATIONS_PATH, route].join('');

  window.history.pushState({}, 'Test page', path);

  return render(
    (
      <BrowserRouter>
        <Configurations />
      </BrowserRouter>
    ),
    { wrapper },
  );
};


describe('Routing', () => {
  it('displays the list on /', async () => {
    renderConfigurations('/');

    await screen.findByRole('grid');

    expect(screen.getByRole('gridcell', { name: 'RS1' })).toBeVisible();
    expect(screen.getByRole('gridcell', { name: 'RS2' })).toBeVisible();
    expect(screen.getByRole('gridcell', { name: 'RS3' })).toBeVisible();
  });

  it('displays the list and details on /:id', async () => {
    renderConfigurations(`/${id}`);

    await screen.findByRole('heading', { name: 'RS1' });
    const generalSection = await screen.findByRole('region', { name: /details.title/ });

    expect(within(generalSection).getByText('RS1')).toBeVisible();
    expect(screen.getByRole('grid')).toBeVisible();
  });

  it('displays editor with data on /:id/edit', async () => {
    renderConfigurations(`/${id}/edit`);

    const layer = screen.getByRole('dialog', { name: /edit/ });

    expect(layer).toBeVisible();

    const nameField = await within(layer).findByRole('textbox', { name: /name/ });

    expect(nameField).toHaveValue('RS1');
    expect(within(layer).getByRole('button', { name: /save/ })).toBeVisible();
  });

  it('displays empty editor on /create', async () => {
    renderConfigurations('/create');

    const layer = screen.getByRole('dialog', { name: /create/ });

    expect(layer).toBeVisible();

    const nameField = await within(layer).findByRole('textbox', { name: /name/ });

    expect(nameField).toHaveValue('');
    expect(within(layer).getByRole('button', { name: /save/ })).toBeVisible();
  });
});
