import React from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { noop } from 'lodash';
import 'cross-fetch/polyfill'; // for Ky using `fetch`
import ky from 'ky';
import { setupServer } from 'msw/node';

export { rest } from 'msw';


const API_ORIGIN = 'http://test/';

export const API_BASE = new URL('/remote-storage', API_ORIGIN);

export const mockKy = ky.create({ prefixUrl: API_ORIGIN });

export const server = setupServer();


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const Provider = props => <QueryClientProvider client={queryClient} {...props} />;


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
