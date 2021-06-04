import React from 'react';
import { Route, useRouteMatch, Redirect, Switch } from 'react-router';

import { Select } from '@folio/stripes/components';

import { Configurations } from '../API';
import { NoConfigurations } from './NoConfigurations';

export const Content = () => {
  const match = useRouteMatch();
  const query = Configurations.useListQuery();

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <Select />
        <span>Table </span>
      </Route>
      <Route>
        {
          query.configurations.length
            ? <Redirect to={`${match.path}/${query.configurations[0].id}`} />
            : <NoConfigurations />
        }
      </Route>
    </Switch>
  );
};
