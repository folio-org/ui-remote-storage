import React from 'react';
import { waitFor } from '@testing-library/react';

import * as components from '@folio/stripes-acq-components';

import { mockKy, rest, server } from '../../test/net';
import { ERROR_RESPONSE, renderConfigurations, url } from './setup';


jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useShowCallout: jest.fn(),
}));

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({ width: 1920, height: 1080 }));

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
  useStripes: () => ({
    hasPerm: jest.fn().mockReturnValue(true),
  }),
  IfPermission: props => <>{props.children}</>,
}));


describe('EditorLayer', () => {
  it('`useSingleQuery` fires showCalloutHook if any error', async () => {
    server.use(rest.get(url.configurations.single, ERROR_RESPONSE));

    const mockShowCallout = jest.fn().mockImplementation(() => jest.fn());

    jest.spyOn(components, 'useShowCallout').mockImplementation(() => mockShowCallout);

    renderConfigurations('/1/edit');

    await waitFor(() => expect(mockShowCallout).toBeCalledWith({ 'messageId': 'ui-remote-storage.error', 'type': 'error' }));
  });

  it('`useSingleQuery` NOT fires showCalloutHook if success', async () => {
    server.use(rest.get(url.configurations.single, (req, res, ctx) => res(ctx.json({
      field1: 'field1',
      field2: 'field2',
    }))));

    const mockShowCallout = jest.fn().mockImplementation(() => jest.fn());

    jest.spyOn(components, 'useShowCallout').mockImplementationOnce(() => mockShowCallout);

    renderConfigurations('/1/edit');

    await waitFor(() => expect(mockShowCallout).not.toBeCalled());
  });
});
