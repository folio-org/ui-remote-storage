import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { Provider, mockKy } from '../../test/net';


jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
}));


export const renderAPIHook = (hook, options) => renderHook(hook, { wrapper: Provider, ...options });

export const ERROR_RESPONSE = (req, res, ctx) => res(ctx.status(500));
