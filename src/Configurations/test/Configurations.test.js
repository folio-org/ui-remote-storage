import React from 'react';
import { screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';

import { server, mockKy } from '../../test/net';
import { CONFIGURATIONS_PATH } from '../../const';
import {
  mockedProviders,
  mockedConfigurations,
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

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => mockKy,
  useStripes: () => ({
    hasPerm: jest.fn().mockReturnValue(true),
  }),
  IfPermission: props => <>{props.children}</>,
}));

beforeEach(() => {
  server.use(
    mockedProviders(),
    mockedConfigurations(),
    mockedSingleConfiguration(),
  );
});


describe('Routing', () => {
  it('displays the list', async () => {
    renderConfigurations();

    await screen.findByRole('grid');

    expect(screen.getByRole('gridcell', { name: 'RS1' })).toBeVisible();
    expect(screen.getByRole('gridcell', { name: 'RS2' })).toBeVisible();
    expect(screen.getByRole('gridcell', { name: 'RS3' })).toBeVisible();
  });

  it('displays the details on row click', async () => {
    renderConfigurations();

    const cell = await screen.findByRole('gridcell', { name: 'RS1' });
    user.click(cell);

    expect(window.location.pathname).toBe(`${CONFIGURATIONS_PATH}/1`);

    await screen.findByRole('heading', { name: 'RS1' });
    const generalSection = await screen.findByRole('region', { name: /details.title/ });

    expect(within(generalSection).getByText('RS1')).toBeVisible();
    expect(screen.getByRole('grid')).toBeVisible();
  });

  it('displays editor with data on menu "Edit" click', async () => {
    renderConfigurations('/1');

    const actions = await screen.findByRole('button', { name: /actions/i });
    user.click(actions);

    const edit = screen.getByRole('button', { name: /edit/i });
    user.click(edit);

    expect(window.location.pathname).toBe(`${CONFIGURATIONS_PATH}/1/edit`);

    const editor = screen.getByRole('dialog', { name: /edit/ });
    expect(editor).toBeVisible();

    const nameField = await within(editor).findByRole('textbox', { name: /name/ });
    expect(nameField).toHaveValue('RS1');
    expect(within(editor).getByRole('button', { name: /save/ })).toBeVisible();
  });

  it('displays empty editor on button "New" click', async () => {
    renderConfigurations();

    const button = await screen.findByRole('button', { name: /new/i });
    user.click(button);

    const editor = screen.getByRole('dialog', { name: /create/ });
    expect(editor).toBeVisible();

    const nameField = await within(editor).findByRole('textbox', { name: /name/ });
    expect(nameField).toHaveValue('');
    expect(within(editor).getByRole('button', { name: /save/ })).toBeVisible();
  });
});
