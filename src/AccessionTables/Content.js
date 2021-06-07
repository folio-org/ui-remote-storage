import React, { useMemo } from 'react';
import { Route, useRouteMatch, useHistory, Redirect, Switch } from 'react-router';

import { Configurations } from '../API';
import { NoConfigurations } from './NoConfigurations';
import { ConfigurationsSelect } from './ConfigurationsSelect';
import { CAIASOFT } from '../const';

export const Content = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const query = Configurations.useListQuery();

  const onSelectConfig = ({ target }) => {
    history.push(`${match.path}/${target.value}`);
  };

  const caiasoftConfigurations = useMemo(() => {
    return query.configurations.filter(({ providerName }) => providerName === CAIASOFT);
  }, [query.configurations]);

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <ConfigurationsSelect
          onSelectConfig={onSelectConfig}
          caiasoftConfigurations={caiasoftConfigurations}
        />
        <span>Table </span>
      </Route>
      <Route>
        {
          caiasoftConfigurations.length
            ? <Redirect to={`${match.path}/${caiasoftConfigurations[0].id}`} />
            : <NoConfigurations />
        }
      </Route>
    </Switch>
  );
};
