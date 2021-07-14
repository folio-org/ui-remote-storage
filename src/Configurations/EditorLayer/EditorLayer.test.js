import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Paneset } from '@folio/stripes/components';
import { EditorLayer } from './EditorLayer';
import * as Mutations from '../../data/Configurations/mutations';

const renderLayer = (create) => {
  const handleClose = () => true;

  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Paneset paneTitle="ok">
          <Switch>
            <Route path="/">
              <EditorLayer configurationId="id" create={create} onClose={handleClose} />
            </Route>
          </Switch>
        </Paneset>
      </BrowserRouter>

    </QueryClientProvider>,
  );
};

describe('EditorLayer', () => {
  it('renders EditorLayer with EDIT FORM', () => {
    renderLayer(false);
    expect(screen.getByText('ui-remote-storage.editForm.title')).toBeVisible();
  });

  it('renders EditorLayer with CREATE FORM', () => {
    renderLayer(true);
    expect(screen.getByText('ui-remote-storage.createForm.title')).toBeVisible();
  });

  it('updateConfiguration mutation must be called', () => {
    const spy = jest.spyOn(Mutations, 'useUpdateMutation');
    renderLayer(false);

    expect(spy).toBeCalled();
  });
});
