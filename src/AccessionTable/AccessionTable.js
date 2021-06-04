import React from 'react';
import { Route, useRouteMatch, Redirect } from 'react-router';

import { Pane, Select } from '@folio/stripes/components';

import { Configurations } from '../API';
import { NoConfigurations, LoadingCentered, ErrorCentered } from '../components';

const AccessionTable = () => {
  const match = useRouteMatch();
  const query = Configurations.useListQuery();

  if (query.isLoading) return <LoadingCentered />;

  if (query.isError) return <ErrorCentered />;

  return (
    <Pane>
      <Route path={match.path}>
        {
          query.configurations.length
            ? <Redirect to={`${match.path}/${query.configurations[0].id}`} />
            : <NoConfigurations />
        }
      </Route>
      <Route path={`${match.path}/:id`}>
        <Select />
        <span>Table </span>
      </Route>
    </Pane>
  );
};

export default AccessionTable;
