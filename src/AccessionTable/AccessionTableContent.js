import React from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, Redirect, Switch } from 'react-router';

import { Select } from '@folio/stripes/components';

import { NoConfigurations } from '../components';

const AccessionTableContent = ({ configurations }) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <Select />
        <span>Table </span>
      </Route>
      <Route>
        {
          configurations.length
            ? <Redirect to={`${match.path}/${configurations[0].id}`} />
            : <NoConfigurations />
        }
      </Route>
    </Switch>
  );
};

AccessionTableContent.propTypes = {
  configurations: PropTypes.arrayOf(PropTypes.object),
};

export default AccessionTableContent;
