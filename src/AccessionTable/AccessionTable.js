import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import { Pane, Select } from '@folio/stripes/components';

import { ACCESSION_PATH } from '../const';
import { NoConfigurations } from '../components';

const AccessionTable = () => {
  return (
    <Pane>
      <Switch>
        <Route path={ACCESSION_PATH} component={NoConfigurations} />
        <Route path={`${ACCESSION_PATH}/:id`}>
          <Select />
          <span>Table </span>
        </Route>
      </Switch>
    </Pane>
  );
};

export default AccessionTable;
