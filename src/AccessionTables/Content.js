import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';

import { useShowCallout } from '@folio/stripes-acq-components';

import { useCaiaSoftConfigurations } from './useCaiaSoftConfigurations';
import { ConfigurationsSelect } from './ConfigurationsSelect';
import { Table } from './Table';

export const Content = () => {
  const showCallout = useShowCallout();
  const { path } = useRouteMatch();
  const query = useCaiaSoftConfigurations({
    onError: () => {
      showCallout({ messageId: 'ui-remote-storage.error' });
    },
  });

  const defaultConfiguration = query.configurations[0];

  return (
    <Switch>
      <Route
        path={`${path}/:id`}
        render={({ match, history }) => (
          <>
            <ConfigurationsSelect
              value={match.params.id}
              onChange={newId => history.push(`${path}/${newId}`)}
            />
            <Table configurationId={match.params.id} />
          </>
        )}
      />
      <Redirect to={`${path}/${defaultConfiguration.id}`} />
    </Switch>
  );
};
