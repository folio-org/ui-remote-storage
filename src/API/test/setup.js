import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { noop } from 'lodash';
import 'cross-fetch/polyfill'; // for Ky using `fetch`
import mockKy from 'ky';
import { setupServer } from 'msw/node';

export { rest } from 'msw';


jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy.create({ prefixUrl: 'http://test/' }),
}));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = props => <QueryClientProvider client={queryClient} {...props} />;

export const renderAPIHook = (hook, options) => renderHook(hook, { wrapper, ...options });

export const server = setupServer();

export const ERROR_RESPONSE = (req, res, ctx) => res(ctx.status(500));


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
