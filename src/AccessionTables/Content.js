import React from 'react';
import { Route, useRouteMatch, Redirect, Switch } from 'react-router';

import { Configurations } from '../API';
import { NoConfigurations } from './NoConfigurations';
import { ConfigurationsSelect } from './ConfigurationsSelect';

export const Content = () => {
  const match = useRouteMatch();
  const query = Configurations.useListQuery();

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <ConfigurationsSelect />
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
