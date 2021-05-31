import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';

import { Provider, server, rest, mockKy, API_BASE } from '../test/net';
import { CONFIGURATIONS_PATH } from '../const';

import { Configurations } from './Configurations';


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


const url = {
  providers: `${API_BASE}/providers`,
  configurations: {
    single: `${API_BASE}/configurations/1`,
    list: `${API_BASE}/configurations`,
  },
};

beforeEach(() => {
  server.use(
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
  );
});


const renderConfigurations = route => {
  const path = [CONFIGURATIONS_PATH, route].join('');

  window.history.pushState({}, 'Test page', path);

  return render(
    (
      <BrowserRouter>
        <Configurations />
      </BrowserRouter>
    ),
    { wrapper: Provider },
  );
};


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
