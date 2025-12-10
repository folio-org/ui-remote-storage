import React from 'react';

import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import { Provider, mockKy } from '../../test/net';


jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
  TitleManager: jest.fn(({ children, ...rest }) => (
    <span {...rest}>{children}</span>
  )),
}));


export const renderAPIHook = (hook, options) => renderHook(hook, { wrapper: Provider, ...options });

export const ERROR_RESPONSE = (req, res, ctx) => res(ctx.status(500));
